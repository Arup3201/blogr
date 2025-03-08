import { GoogleLogin } from "@react-oauth/google";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  return (
    <Card className="mx-auto w-md">
      <CardHeader>
        <CardTitle>Login to Blogr</CardTitle>
        <CardDescription>Resume your collaborative blogging</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login" onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="john@example.com" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" placeholder="********" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button form="login" type="submit">
          Login
        </Button>
        <p>
          Not part of blogr? Start your journey{" "}
          <a className="text-blue-400" href="/signup">
            here
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
}

export default Login;
