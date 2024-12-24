import { Card } from "../../widgets/card";
import Logo from "../../../assets/logo.png";
import { Field } from "../../widgets/field";
import { Form } from "../../widgets/form";
import { Button } from "../../widgets/button";
import { Input } from "../../widgets/input";

function Login() {
  function handleLogin(event) {
    event.preventDefault();

    const fd = new FormData(event.target);

    const data = Object.fromEntries(fd.entries());
  }

  return (
    <Card>
      <img src={Logo} className="mx-auto w-12" />
      <p className="text-lg font-bold text-gray-600">
        Welcome back to Blogr AI, login to resume your journey.
      </p>
      <Form onSubmit={handleLogin}>
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="me@example.com"
          />
        </Field>
        <Field label="Password" htmlFor="password">
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="********"
          />
        </Field>
        <Button type="submit">Login</Button>
      </Form>
    </Card>
  );
}

export default Login;
