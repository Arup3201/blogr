import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { Input, Button, Form } from "../widgets";
import logoImg from "../assets/logo.svg";
import { UserService } from "../services/user_service.js";
import { useContext } from "react";
import { AuthContext } from "../store/authentication-context.jsx";
import CircularProgress from "@mui/material/CircularProgress";

export default function LogIn() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const { setIsLoading } = useContext(AuthContext);

  function handleLogin(event) {
    event.preventDefault();
    setIsLoading(true);
    UserService.loginUser({ username: username, password: password })
      .then((response) => {
        console.log(response.message);
        onLoginSuccess();
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  function handleRegisterClick(e) {
    e.preventDefault();
    navigate("/register");
  }

  function onLoginSuccess() {
    navigate("/main-page");
    setIsLoading(false);
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
