export function Header({ children, title = "Todo App" }) {
  return (
    <header style={{ display: "flex" }}>
      <h1 data-testId="header-title">{title}</h1>
      {children}
    </header>
  );
}
