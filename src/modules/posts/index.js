import { Router } from 'express';
import { tilRouter } from './router';

const router = Router();
router.use('/til', tilRouter);

export const PostsModule = {
  init: async (app) => app.use(router),
};
