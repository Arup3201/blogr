import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Input from "../components/Input/Input.jsx";
import Button from "../components/Button.jsx";
import logoImg from "../assets/logo.svg";
import { UserService } from "../service/user_service.js";

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
    <>
      <form className="box" onSubmit={handleRegister}>
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
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        >
          {"Email"}
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
          {!loading ? "Register" : "Trying to register..."}
        </Button>
        <p>
          If you are already a member,{" "}
          <a href="#" onClick={handleLoginClick}>
            login here
          </a>
          .
        </p>
      </form>
    </>
  );
}
