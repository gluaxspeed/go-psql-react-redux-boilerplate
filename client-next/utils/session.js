export const setCookie = (key, value) => {
  if(process.browser) {
    cookie.set(key, value, { expires: 1, path: '/' });
  }
};

export const getCookie = (key, req) => {
  return process.browser ? getCookieFromBrowser(key) :
                           getCookieFromServer(key, req);
};