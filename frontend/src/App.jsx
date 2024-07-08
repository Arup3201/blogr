import { Header } from "./components/Header.jsx";
import AuthContainer from "./components/AuthContainer/AuthContainer";
import { LOGIN_META_DATA } from "./data";
import logoImg from "./assets/logo.svg";

function App() {
  function handleClick() {
    console.log("Clicked");
  }

  return (
    <div>
      <Header headerImg={logoImg} headerTitle="Blogr.AI" />
      <AuthContainer
        userInputMetaData={LOGIN_META_DATA}
        handleClick={handleClick}
        buttonName="Login"
      />
    </div>
  );
}

export default App;
