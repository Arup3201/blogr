import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { Input, Button, Form } from "../widgets";
import logoImg from "../assets/logo.svg";
import { UserService } from "../services/user_service.js";

export default function LogIn() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    UserService.loginUser({ username: username, password: password })
      .then((response) => {
        console.log(response.message);
        onLoginSuccess();
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  }

  function handleRegisterClick(e) {
    e.preventDefault();
    navigate("/register");
  }

  function onLoginSuccess() {
    navigate("/editor");
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
        id="password"
        label="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button variant="contained" onClick={handleLogin}>
        Log in
      </Button>
      <p>
        If you are already a member,
        <a href="#" onClick={handleRegisterClick}>
          register here
        </a>
        .
      </p>
    </Form>
  );
}
