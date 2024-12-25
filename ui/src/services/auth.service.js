import { post } from "./service";

const Auth = {
  login: (data) => {
    return post("api/auth/login", data);
  },
};

export { Auth };
