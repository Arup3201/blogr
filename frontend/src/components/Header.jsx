export default function Header({ children, ...props }) {
  return (
    <header>
      <img {...props} alt={children} />
      <h1>{children}</h1>
    </header>
  );
}
