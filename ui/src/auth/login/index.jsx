import { toast } from "sonner";

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

import useAuth from "@/hooks/useAuth";
import { Auth } from "../../services/auth.service";

function Login() {
  const { setAuth } = useAuth();

  async function handleLogin(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    try {
      const response = await Auth.login(formData);
      const data = await response.json();
      const accessToken = data?.accessToken;
      setAuth((prev) => ({ ...prev, accessToken }));
      toast(`Welcome ${data?.user?.email}`);
    } catch (err) {
      console.error(err);
    }
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
