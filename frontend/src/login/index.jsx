import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Input from "../components/Input/Input.jsx";
import Button from "../components/Button.jsx";
import logoImg from "../assets/logo.svg";
import { UserService } from "../service/user_service.js";

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
    <>
      <form className="box" onSubmit={handleLogin}>
        <Header src={logoImg}>{"Blogr.AI"}</Header>

        <Input
          placeholder=""
          name="username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        >
          {"User Name"}
        </Input>
        <Input
          placeholder=""
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        >
          {"Password"}
        </Input>
        <Button className={"box-btn"}>
          {!loading ? "Login" : "Trying to login..."}
        </Button>
        <p>
          If you are not a member,{" "}
          <a href="#" onClick={handleRegisterClick}>
            register here
          </a>
          .
        </p>
      </form>
    </>
  );
}
