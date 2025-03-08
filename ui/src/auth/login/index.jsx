import { GoogleLogin } from "@react-oauth/google";

import { Button } from "@/components/ui/button";

import { Auth } from "../../services/auth.service";

/*
Best UX Practices for LogIn and Signup: https://medium.com/@fiona.chiaraviglio/best-practices-for-login-sign-up-from-a-ux-perspective-e5d14b6ffce0

Provide login using Google ✅
Email Validation
Password Hide Button✅
Forgot Password✅
Sign Up Rephrased✅
*/

function Login() {
  function handleLogin(event) {
    event.preventDefault();

    const fd = new FormData(event.target);

    const data = Object.fromEntries(fd.entries());
    Auth.login(data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  function onGoogleLogin(response) {
    Auth.googleAuthorize({
      credential: response.credential,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  }

  return <Button>Login</Button>;
}

export default Login;
