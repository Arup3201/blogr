import { UserInput } from "../UserInput/UserInput";
import { AuthButton } from "./AuthButton";
import "./AuthContainer.css";

export default function AuthContainer({
  buttonName,
  handleClick,
  userInputMetaData,
}) {
  return (
    <div className="auth-container">
      {userInputMetaData.map((metaData, i) => (
        <UserInput key={i} {...metaData} />
      ))}

      <AuthButton buttonName={buttonName} onSelect={handleClick} />
    </div>
  );
}
