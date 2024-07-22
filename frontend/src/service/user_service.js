import { get, post } from "./service.js";

export const UserService = {
  registerUser(data) {
    return post("/auth/register", data);
  },
  loginUser(data) {
    return post("/auth/login", data);
  },
  hasToken() {
    const cookies = document.cookie;
    const token_cookie = cookies
      .split(";")
      .filter((cookie) => cookie.includes("token"))[0]
      .split("=")[1];
    return token_cookie;
  },
};
