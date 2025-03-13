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

import { Auth } from "../../services/auth.service";

function Signup() {
  async function handleSignup(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    try {
      await Auth.signup(formData);
      toast("Your account has been created in BlogR!");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card className="mx-auto w-md">
      <CardHeader>
        <CardTitle>Blogr Signup</CardTitle>
        <CardDescription>Start your collaborative blogging</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup" onSubmit={handleSignup}>
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
        <Button type="submit" form="signup">
          Signup
        </Button>
        <p>
          Already a part of blogr? Resume your journey{" "}
          <a className="text-blue-400" href="/">
            here
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
}

export default Signup;
