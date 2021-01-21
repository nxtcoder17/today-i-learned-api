import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { AuthModels } from '../models';
import jwtService from './jwt-service';

const service = {};

service.doLogin = async ({ email, password }) => {
  const existing = await AuthModels.User.findOne({ email });
  const isMatch = await bcrypt.compare(password, existing.password);
  if (!isMatch) throw createError(StatusCodes.UNAUTHORIZED, 'No User Found');
  const tokens = await Promise.all([
    jwtService.genAccessToken(existing._id),
    jwtService.genRefreshToken(existing._id),
  ]);
  return { accessToken: tokens[0], refreshToken: tokens[1] };
};

const doHashPassword = (orgPassword) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(
      orgPassword,
      parseInt(process.env.SALT_ROUNDS, 10) || 8,
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });

service.doRegister = async ({ email, password }) => {
  const hashedPassword = await doHashPassword(password);
  const existing = await AuthModels.User.findOne({ email });
  if (existing) throw createError(StatusCodes.BAD_REQUEST);
  return AuthModels.User.create({ email, password: hashedPassword });
};

service.handleRefreshToken = async (refreshToken) => {
  if (!refreshToken)
    throw createError(
      StatusCodes.BAD_REQUEST,
      'Invalid Arguments: No refreshToken'
    );
  const { user_id: userId } = await jwtService.verifyRefreshToken(refreshToken);

  const [accessToken, newRefreshToken] = await Promise.all([
    jwtService.genAccessToken(userId),
    jwtService.genRefreshToken(userId),
  ]);

  return { accessToken, refreshToken: newRefreshToken };
};

service.getUser = async (userId) => AuthModels.User.findOne({ _id: userId });

export default service;
