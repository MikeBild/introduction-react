import "./Layout.css"

interface LayoutProps {
  children?: React.ReactNode;
  loggedInUser: string | null;
  setLoggedInUser: (user: string | null) => void;
  testId?: string;
}

export default function Layout({ children, loggedInUser, setLoggedInUser, testId }: LayoutProps) {
  if (!loggedInUser) {
    return (
      <div className="login-container" data-testid={`${testId}-login`}>
        <div className="login-box">
          {children}
        </div>
      </div>
    )
  }
  return (
    <div className="layout-container" data-testid={`${testId}-app`}>
      <header>
        <div className="header-content">
          <div className="header-title">ENDGAME</div>
          <div className="user-info-section">
            <p>Welcome, {loggedInUser}!</p>
            <button onClick={() => setLoggedInUser(null)}>Logout</button>
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
      <footer>@2025 ReactJS Workshop ENDGAME</footer>
    </div>
  )
}
