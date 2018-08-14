import React from "react";

export function Header() {
  return <header>Header</header>;
}
export function Footer() {
  return <footer>Footer</footer>;
}

export function Layout({ children }) {
  return (
    <div>
      <Header />
      <content>{children}</content>
      <Footer />
    </div>
  );
}
