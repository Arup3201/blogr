import { Card } from "../../widgets/card";
import Logo from "../../../assets/logo.png";
import { Field } from "../../widgets/field";
import { Form } from "../../widgets/form";
import { Button } from "../../widgets/button";
import { Input, Password } from "../../widgets/input";
import { Auth } from "../../../services/auth.service";
import { GoogleLogin } from "@react-oauth/google";

/*
Best UX Practices for LogIn and Signup: https://medium.com/@fiona.chiaraviglio/best-practices-for-login-sign-up-from-a-ux-perspective-e5d14b6ffce0
*/

function Signup() {
  function handleSignup(event) {
    event.preventDefault();

    const fd = new FormData(event.target);

    const data = Object.fromEntries(fd.entries());
    Auth.signup(data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  function onGoogleSignup(response) {
    Auth.googleAuthorize({
      credential: response.credential,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  }

  return (
    <Card>
      <img src={Logo} className="mx-auto w-12" />
      <p className="text-lg font-bold text-gray-900">Create Account in Blogr</p>
      <Form onSubmit={handleSignup}>
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="me@example.com"
          />
        </Field>
        <Field label="Password" htmlFor="password">
          <Password
            id="password"
            name="password"
            rules={[
              {
                message: "Has Atleast 2 Uppercase Latin Characters",
                type: "match",
                pattern: /[A-Z]/g,
                appears: 2,
              },
              {
                message: "Has Atleast 3 Lowercase Latin Characters",
                type: "match",
                pattern: /[a-z]/g,
                appears: 3,
              },
              {
                message: "Has Atleast 2 Numbers",
                type: "match",
                pattern: /[0-9]/g,
                appears: 2,
              },
              {
                message: "Has Atleast 1 Special Character",
                type: "match",
                pattern: /[`~!@#$%^&*\(\)+=\{\[\}\}|:;\"'<,>\\_\.\-\?\/]/g,
                appears: 1,
              },
              {
                message: "Has Atleast 8 Characters",
                type: "length",
                len: 8,
              },
            ]}
          />
        </Field>
        <Button type="submit">Signup</Button>
      </Form>
      {/* <fieldset className="flex w-full flex-col items-center border-t-2">
        <legend className="text-md mb-2 text-gray-800">or you can also</legend>
        <GoogleLogin onSuccess={onGoogleSignup} />
      </fieldset> */}
      <div className="mt-2 text-sm font-medium text-gray-800">
        Already a Part of Blogr?{" "}
        <a
          href="/"
          className="border-b-2 border-b-transparent text-indigo-500 hover:border-indigo-500"
        >
          Resume Your Reading Journey
        </a>
      </div>
    </Card>
  );
}

export default Signup;
