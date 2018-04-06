import { redirect, setCookie, getCookie, removeCookie } from "../utils";

export async function signIn(email, password) {


  setCookie("jwt", res.jwt);
  redirect("/user");
  return null;
};

export const signUp = async (name, email, password, password_confirmation) => {
  const error = validateNewUser(name, email, password, password_confirmation);
  if (error) {
    return error;
  }

  const res = await createUser(name, email, password, password_confirmation);

  if (!res.data) {
    return res;
  }

  setCookie("success", `${name}, your account was created.`);
  redirect("/auth/login");
  return null;
};

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie("jwt");
    redirect("/auth/login", ctx);
  }
};

export const getJwt = ctx => {
  return getCookie("jwt", ctx.req);
};

export const isAuthenticated = ctx => !!getJwt(ctx);

export const redirectIfAuthenticated = ctx => {
  if (isAuthenticated(ctx)) {
    redirect("/user", ctx);
    return true;
  }
  return false;
};

export const redirectIfNotAuthenticated = ctx => {
  if (!isAuthenticated(ctx)) {
    redirect("/auth/login", ctx);
    return true;
  }
  return false;
};