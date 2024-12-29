import { post } from "./service";

const Auth = {
  login: (data = {}) => {
    return post("api/auth/login", data);
  },
  googleLogin: (data = {}) => {
    return post("api/auth/google-login", data);
  },
};

export { Auth };
