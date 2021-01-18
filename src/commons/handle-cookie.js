const accessToken = 'ACCESS_TOKEN';
const refreshToken = 'REFRESH_TOKEN';

export const setCookieHandler = (res) => ({
  addCookie({ key, value, options = {} }) {
    res.cookie(key, value, options);
  },
  dropCookie(key) {
    res.clearCookie(key);
  },

  addAccessToken(value) {
    this.addCookie({
      key: accessToken,
      value,
      options: {
        httpOnly: true,
        sameSite: 'strict',
      },
    });
  },

  addRefreshToken(value) {
    this.addCookie({
      key: refreshToken,
      value,
      options: {
        httpOnly: true,
        sameSite: 'strict',
      },
    });
  },
});

export const getCookieHandler = (req) => ({
  get(key) {
    return req.cookies[key] || null;
  },

  getAccessToken() {
    return req.cookies[accessToken] || null;
  },
  getRefreshToken() {
    return req.cookies[refreshToken] || null;
  },
});
