import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
// import { config } from '#config';

// const REGISTER_URL = `http://localhost:${config.PORT}/auth`;
const REGISTER_URL = `http://localhost:3000/auth`;

const getUrl = (endpoint) => `${REGISTER_URL}/${endpoint}`;

describe('Register', () => {
  test('says BAD REQUEST on empty body', async () => {
    try {
      await axios.post(getUrl('register'));
    } catch (err) {
      expect(err.response.status).toBe(StatusCodes.BAD_REQUEST);
    }
  });

  test('says User Registration Successfull', async () => {
    const body = {
      firstName: 'Anshuman',
      lastName: 'Bhaskar',
      email: 'nxtcoder17@gmail.com',
      password: '1234',
      campus: 'sample campus',
      roles: 'parent',
    };
    const resp = await axios.post(getUrl('register'), body);
    expect(resp.status).toBe(StatusCodes.OK);
  });

  test('says CONFLICT if user already exists', async () => {
    try {
      const body = {
        firstName: 'Anshuman',
        lastName: 'Bhaskar',
        email: 'nxtcoder17@gmail.com',
        password: '1234',
        campus: 'sample campus',
        roles: 'parent',
      };
      await axios.post(getUrl('register'), body);
    } catch (err) {
      expect(err.response.status).toBe(StatusCodes.CONFLICT);
    }
  });

  test('says User Update Successfull', async () => {
    const resp = await axios.post(getUrl('update-user'));
    expect(resp.status).toBe(StatusCodes.OK);
  });
});
