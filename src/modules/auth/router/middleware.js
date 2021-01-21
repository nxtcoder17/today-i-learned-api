import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors-lite';
import assert from 'assert';
import { getLogger } from '@commons/logger';
import jwtService from '../service/jwt-service';
import authService from '../service';

const logger = getLogger('auth/middleware');

const isLoggedIn = (req, res, next) => {
  (async () => {
    try {
      assert(
        req.getAccessToken != null,
        'CookieMiddleware not loaded prior to Loading AuthMiddleware'
      );

      const accessToken = req.getAccessToken();
      if (!accessToken) {
        throw new Error('No Access Token in request');
      }

      let userId = null;

      try {
        const { user_id } = await jwtService.verifyAccessToken(accessToken);
        // eslint-disable-next-line camelcase
        userId = user_id;
      } catch (err) {
        const refreshToken = req.getRefreshToken();
        logger.debug(`Using Refresh Token: ${refreshToken}`);
        const { user_id } = await jwtService.verifyRefreshToken(refreshToken);
        // eslint-disable-next-line camelcase
        userId = user_id;

        const newTokens = await authService.handleRefreshToken(refreshToken);
        if (!newTokens) {
          logger.info('Refresh Token has been invalidated');
          throw new Error('Unauthorized');
        }

        res.addAccessToken(newTokens.accessToken);
        res.addRefreshToken(newTokens.refreshToken);
      }
      if (!userId) throw new Error();
      req.user_id = userId;
      next();
    } catch (err) {
      logger.error(err);
      next(createError(StatusCodes.UNAUTHORIZED));
    }
  })();
};

const isRoot = (req, res, next) => {
  (async () => {
    try {
      const { userId } = req;
      if (!userId) throw new Error('pre-check failed');
      const user = await authService.getUser(userId);
      req.user = user;
      if (['root'].some((item) => user.roles.indexOf(item) !== -1)) next();
      throw new Error('UnAuthorized');
    } catch (err) {
      logger.error(err);
      next(createError(StatusCodes.FORBIDDEN));
    }
  })();
};

export const authMiddleware = {
  isLoggedIn,
  isRoot,
};
