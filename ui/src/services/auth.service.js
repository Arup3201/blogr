import { post } from "./service";
import { get as PrivateGet } from "./privateService";

const Auth = {
  login: (data = {}) => {
    return post("api/auth/login", data);
  },
  signup: (data = {}) => {
    return post("api/auth/signup", data);
  },
  refreshToken: (token, data = {}) => {
    return PrivateGet("api/auth/refresh", token, data);
  },
  googleAuthorize: (data = {}) => {
    return post("api/auth/google/authorize", data);
  },
};

export { Auth };
