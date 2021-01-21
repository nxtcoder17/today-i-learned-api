import createError from 'http-errors-lite';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { finishApp, getAnApp } from '#app';
import authRouter from '../index';
import authService from '../../service/index';

jest.mock('../../service', () => ({
  doRegister: jest.fn(),
}));

jest.mock('../middleware', () => ({
  authMiddleware: {
    isLoggedIn: jest.fn((req, res, next) => {
      next();
    }),
    isRoot: jest.fn((req, res, next) => {
      next();
    }),
  },
}));

const app = getAnApp();
app.use(authRouter);
finishApp(app);

describe('Auth Router', () => {
  describe('/register', () => {
    test('says whether registration service is being called', async () => {
      const resp = await request(app).post('/register').send({
        firstName: 'testFirstName',
        lastName: 'testLastName',
        email: 'testEmail',
        password: 'testpassword',
      });

      expect(authService.doRegister).toBeCalledWith({
        firstName: 'testFirstName',
        lastName: 'testLastName',
        email: 'testEmail',
        password: 'testpassword',
      });

      expect(resp.body).toStrictEqual({ msg: 'Registration Successfull' });
    });

    test('register route testing error case', async () => {
      authService.doRegister = jest.fn(() => {
        throw createError(StatusCodes.IM_A_TEAPOT, 'asdfa');
      });

      await request(app)
        .post('/register')
        .send({
          firstName: 'testFirstName',
          lastName: 'testLastName',
          email: 'testEmail',
          password: 'testpassword',
        })
        .expect(StatusCodes.IM_A_TEAPOT);

      expect(authService.doRegister).toBeCalledWith({
        firstName: 'testFirstName',
        lastName: 'testLastName',
        email: 'testEmail',
        password: 'testpassword',
      });
    });
  });

  describe('/login', () => {
    test('says whether login service is called or not', async () => {
      const loginData = {
        email: 'sample@gmail.com',
        password: 'sample',
      };

      await request(app).post('/login').send(loginData);
    });
  });
});
