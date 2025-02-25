import { post } from "./service";

const Auth = {
  login: (data = {}) => {
    return post("api/auth/login", data);
  },
  signup: (data = {}) => {
    return post("api/auth/signup", data);
  },
  googleAuthorize: (data = {}) => {
    return post("api/auth/google/authorize", data);
  },
};

export { Auth };
