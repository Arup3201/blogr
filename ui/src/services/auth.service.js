import service, { privateService, GET, POST } from "./service";

const Auth = {
  login: (data = {}) => {
    return service("api/auth/login", POST, data);
  },
  signup: (data = {}) => {
    return service("api/auth/signup", POST, data);
  },
  refreshToken: (token, data = {}) => {
    return PrivateGet("api/auth/refresh", GET, token, data);
  },
  googleAuthorize: (data = {}) => {
    return service("api/auth/google/authorize", POST, data);
  },
};

export { Auth };
