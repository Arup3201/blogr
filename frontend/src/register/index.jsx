import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { Input, Button, Form } from "../widgets";
import logoImg from "../assets/logo.svg";
import { UserService } from "../services/user_service.js";

export default function Register() {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleRegister(event) {
    event.preventDefault();
    setLoading(true);
    UserService.registerUser({
      username: username,
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response.message);
        onRegisterSuccess();
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  }

  function handleLoginClick(e) {
    e.preventDefault();
    navigate("/");
  }

  function onRegisterSuccess() {
    navigate("/");
  }

  return (
    <Form className="formBox">
      <Header src={logoImg}>{"Blogr.AI"}</Header>
      <Input
        required
        id="username"
        label="User name"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <Input
        required
        id="email"
        label="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Input
        required
        id="password"
        label="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button variant="contained" onClick={handleRegister}>
        Register
      </Button>
      <p>
        If you are already a member,{" "}
        <a href="#" onClick={handleLoginClick}>
          login here
        </a>
        .
      </p>
    </Form>
  );
}
