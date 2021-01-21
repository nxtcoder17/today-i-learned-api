import { cookieMiddleware } from '@commons/handle-cookie-middleware';
import { Router } from 'express';
import { httpHandler } from '@commons/http-handler';
import assert from 'assert';
import authService from '../service';
import { authMiddleware } from './middleware';

const authRouter = Router();

authRouter.post(
  '/register',
  httpHandler(async (req, res) => {
    const { email, password } = req.body;
    assert([email, password].every((item) => item != null));

    await authService.doRegister(req.body);
    res.send({ msg: 'Registration Successfull' });
  })
);

authRouter.post(
  '/login',
  cookieMiddleware,
  httpHandler(async (req, res) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authService.doLogin({
      email,
      password,
    });

    console.log({ accessToken, refreshToken });

    res.addAccessToken(accessToken);
    res.addRefreshToken(refreshToken);

    res.send({ msg: 'Login Successfull' });
  })
);

authRouter.get(
  '/logout',
  cookieMiddleware,
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    await authService.logoutUserWithToken(refreshToken);
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.send({ msg: 'Logout Successfull' });
  })
);

authRouter.get(
  '/logout-from-all-devices',
  httpHandler(async (req, res) => {
    await authService.removeAllTokens({ userId: req.userId });
    res.status(200).send({ msg: 'Successfully Logged Out from All Devices' });
  })
);

authRouter.get(
  '/who-am-i',
  cookieMiddleware,
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    res.send(`LoggedIn User: ${req.user_id}`);
  })
);

export default authRouter;
