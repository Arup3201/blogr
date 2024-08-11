import { get, post } from "./service.js";

export const UserService = {
  registerUser(data) {
    return post("/auth/register", data);
  },
  loginUser(data) {
    return post("/auth/login", data);
  },
};
