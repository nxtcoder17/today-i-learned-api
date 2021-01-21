import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'None',
};

export function cookieMiddleware(req, res, next) {
  // Utilities over Response Object
  res.addCookie = ({ key, value, options }) => {
    res.cookie(key, value, options);
  };

  res.addAccessToken = (token) => {
    res.addCookie({ key: ACCESS_TOKEN, value: token, options: cookieOptions });
  };

  res.addRefreshToken = (token) => {
    res.addCookie({ key: REFRESH_TOKEN, value: token, options: cookieOptions });
  };

  res.dropCookie = (key) => {
    res.clearCookie(key);
  };

  // Utilities over Request Object
  req.getCookie = (key) => {
    if (!(key in req.cookies))
      throw createError(
        StatusCodes.BAD_REQUEST,
        `Cookie: ${key} is not available in request`
      );
    return req.cookies[key];
  };

  req.getAccessToken = () => req.getCookie(ACCESS_TOKEN);

  req.getRefreshToken = () => req.getCookie(REFRESH_TOKEN);

  next();
}
