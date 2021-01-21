import jwt from 'jsonwebtoken';
import { AuthModels } from '../models';

const { RefreshToken } = AuthModels;

const {
  JWT_SECRET,
  REFRESH_JWT_SECRET,
  JWT_TOKEN_EXPIRES_IN_SEC,
  JWT_REFRESH_TOKEN_EXPIRES_IN_MIN,
} = process.env;

async function refreshTokenPreHook(refreshToken) {
  const status = await RefreshToken.findOne({ token: refreshToken });
  if (!status) throw new Error('Refresh Token Removed from DB');
}

const getNumber = (value) =>
  typeof value === 'number' ? value : parseInt(value, 10);

const jwtService = {};

jwtService.genAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { user_id: userId.toString() },
      JWT_SECRET,
      {
        expiresIn: `${getNumber(JWT_TOKEN_EXPIRES_IN_SEC)}s`,
        issuer: 'giiki',
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

jwtService.genRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { user_id: userId.toString() },
      REFRESH_JWT_SECRET,
      {
        expiresIn: `${getNumber(JWT_REFRESH_TOKEN_EXPIRES_IN_MIN)}m`,
        issuer: 'giiki',
      },
      (err, token) => {
        if (err) return reject(err);
        (async () => {
          await RefreshToken.create({ user_id: userId, token });
        })();
        return resolve(token);
      }
    );
  });
};

jwtService.verifyAccessToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

jwtService.verifyRefreshToken = async (refreshToken) => {
  await refreshTokenPreHook(refreshToken);
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      REFRESH_JWT_SECRET,
      { algorithms: ['HS256'] },
      (err, data) => {
        if (err) {
          (async () => {
            await RefreshToken.deleteOne({ token: refreshToken });
          })();
          reject(err);
        }
        resolve(data);
      }
    );
  });
};

export default jwtService;
