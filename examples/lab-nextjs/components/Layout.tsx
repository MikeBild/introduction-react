import Link from "next/link";

export interface LayoutProps {
  renderFooter?: React.ReactNode;
  children?: React.ReactNode;
}

export function Layout({ children, renderFooter }: LayoutProps) {
  return (
    <div>
      <header>
        <h1>LAB App</h1>
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </header>
      <hr />
      <main>{children}</main>
      <hr />
      <footer>
        <div>{renderFooter}</div>
        <small>@2024</small>
      </footer>
    </div>
  );
}
