function Hero({ setPage }) {

  const features = [
    {
      id: "assistant",
      icon: "✦",
      title: "AI Government Assistant",
      description:
        "Get instant answers about government schemes, services and required documents.",
      className: "blue-card",
    },
    {
      id: "complaint",
      icon: "⚠",
      title: "AI Complaint Generator",
      description:
        "Upload a civic issue image and generate a professional complaint using AI.",
      className: "orange-card",
    },
    {
      id: "history",
      icon: "▣",
      title: "Complaint History",
      description:
        "Keep track of complaints generated during your current session.",
      className: "purple-card",
    },
    {
      id: "about",
      icon: "ⓘ",
      title: "About Smart Bharat",
      description:
        "Learn how AI and modern web technology power this civic platform.",
      className: "green-card",
    },
  ];

  return (
    <section className="hero">

      {/* Background decorations */}
      <div className="hero-glow glow-one"></div>
      <div className="hero-glow glow-two"></div>

      {/* Badge */}
      <div className="hero-badge">
        <span>🇮🇳</span>
        BUILT FOR SMART INDIA
      </div>

      {/* Heading */}
      <h1>
        AI-Powered Civic Services
        <br />
        <span>for a Smarter Bharat.</span>
      </h1>

      <p className="hero-description">
        Access government information, understand civic services and
        generate complaints using the power of Artificial Intelligence.
      </p>

      {/* CTA */}
      <div className="hero-actions">

        <button
          className="primary-button"
          onClick={() => setPage("assistant")}
        >
          ✦ Ask AI Assistant
          <span>→</span>
        </button>

        <button
          className="secondary-button"
          onClick={() => setPage("complaint")}
        >
          Report a Civic Issue
        </button>

      </div>

      {/* Feature heading */}
      <div className="features-heading">
        <span>EXPLORE SERVICES</span>
        <h2>Everything you need in one place</h2>
      </div>

      {/* Cards */}
      <div className="feature-grid">

        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => setPage(feature.id)}
            className={`feature-card ${feature.className}`}
          >

            <div className="feature-icon">
              {feature.icon}
            </div>

            <div className="feature-arrow">
              ↗
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

            <span className="learn-more">
              Explore service →
            </span>

          </button>
        ))}

      </div>

    </section>
  );
}

export default Hero;