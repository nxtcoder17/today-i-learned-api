import { Router } from 'express';
import authRouter from './router';

const router = Router();
router.use('/auth', authRouter);

const AuthModule = {
  init: (app) => app.use(router),
};
export default AuthModule;
