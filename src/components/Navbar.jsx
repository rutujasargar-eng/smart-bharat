function Navbar({ page, setPage }) {

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: "⌂",
    },
    {
      id: "assistant",
      label: "AI Assistant",
      icon: "✦",
    },
    {
      id: "complaint",
      label: "Report Issue",
      icon: "⚠",
    },
    {
      id: "history",
      label: "History",
      icon: "▣",
    },
    {
      id: "about",
      label: "About",
      icon: "ⓘ",
    },
  ];

  return (
    <header className="navbar">

      <div className="navbar-inner">

        {/* Logo */}
        <button
          className="brand"
          onClick={() => setPage("home")}
        >
          <div className="brand-logo">
            🇮🇳
          </div>

          <div className="brand-text">
            <span className="brand-name">Smart Bharat</span>
            <span className="brand-tagline">
              AI Civic Platform
            </span>
          </div>
        </button>

        {/* Navigation */}
        <nav className="nav-links">

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`nav-item ${
                page === item.id ? "active" : ""
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}

        </nav>

        {/* Status */}
        <div className="nav-status">
          <span className="status-dot"></span>
          AI Online
        </div>

      </div>

    </header>
  );
}

export default Navbar;