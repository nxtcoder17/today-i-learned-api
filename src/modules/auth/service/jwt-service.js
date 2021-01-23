import jwt from 'jsonwebtoken';
import { AuthModels } from '../models';

const { RefreshToken } = AuthModels;

async function refreshTokenPreHook(refreshToken) {
  const status = await RefreshToken.findOne({ token: refreshToken });
  if (!status) throw new Error('Refresh Token Removed from DB');
}

const jwtService = {};

jwtService.genAccessToken = (userId) => {
  console.log('ACCESS_TOKEN: ', `${process.env.JWT_TOKEN_EXPIRES_IN_SEC}s`);
  return new Promise((resolve, reject) => {
    jwt.sign(
      { user_id: userId.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: '15s',
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
  console.log(
    'REFRESH_TOKEN: ',
    `${process.env.JWT_REFRESH_TOKEN_EXPIRES_IN_MIN}m`
  );
  return new Promise((resolve, reject) => {
    jwt.sign(
      { user_id: userId.toString() },
      process.env.REFRESH_JWT_SECRET,
      {
        expiresIn: '5m',
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
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: ['HS256'] },
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      }
    );
  });
};

jwtService.verifyRefreshToken = async (refreshToken) => {
  await refreshTokenPreHook(refreshToken);
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET,
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
