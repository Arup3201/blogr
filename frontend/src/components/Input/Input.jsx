import "./Input.css";

export default function Input({ children, ...props }) {
  return (
    <div className="user-input">
      <label htmlFor={props.name}>{children}</label>
      <input {...props} />
    </div>
  );
}
