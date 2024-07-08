import "./UserInput.css";

export function UserInput({ inputLabel, inputPlaceholder, inputName }) {
  return (
    <div className="user-input">
      <label for={inputLabel}>{inputLabel}</label>
      <input placeholder={inputPlaceholder} name={inputName} />
    </div>
  );
}
