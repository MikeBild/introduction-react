export function Header({ children }) {
  return (
    <header style={{ display: "flex" }}>
      <h1>Todo App</h1>
      {children}
    </header>
  );
}
