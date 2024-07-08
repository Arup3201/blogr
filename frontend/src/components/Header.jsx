export function Header({ headerImg, headerTitle }) {
  return (
    <header>
      <img src={headerImg} alt={headerTitle} />
      <h1>{headerTitle}</h1>
    </header>
  );
}
