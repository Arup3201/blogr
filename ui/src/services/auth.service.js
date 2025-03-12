import { service, POST } from "./service";

const Auth = {
  login: (data = {}) => {
    return service("api/auth/login", POST, data);
  },
  signup: (data = {}) => {
    return service("api/auth/signup", POST, data);
  },
  googleAuthorize: (data = {}) => {
    return service("api/auth/google/authorize", POST, data);
  },
};

export { Auth };
