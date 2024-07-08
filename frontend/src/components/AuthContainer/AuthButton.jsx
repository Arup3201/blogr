export function AuthButton({ buttonName, onSelect }) {
  return (
    <button className="btn btn--auth" onClick={onSelect}>
      {buttonName}
    </button>
  );
}
