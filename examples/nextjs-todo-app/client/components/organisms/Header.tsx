export function Header({ children, title = "Todo App" }) {
  return (
    <header style={{ display: "flex" }}>
      <h1 data-testid="Header-title">{title}</h1>
      <span data-testid="Header-children">{children}</span>
    </header>
  );
}
