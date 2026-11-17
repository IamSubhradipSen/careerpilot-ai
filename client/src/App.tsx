
import { useEffect, useState } from "react";
import "./App.css";

import dashboardService, {
  type DashboardData,
} from "./services/dashboard.service";

import authService, { type AuthUser } from "./services/auth.service";

import ResumeAnalyzer from "./features/resume/ResumeAnalyzer";

type AuthMode = "login" | "register";

function App() {
  const [token, setToken] = useState(
    () => localStorage.getItem("accessToken") || ""
  );

  const [user, setUser] = useState<AuthUser | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setDashboard(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    setLoading(true);
    setError("");

    dashboardService
      .getOverview()
      .then((data) => {
        if (!cancelled) {
          setDashboard(data);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError("Unable to load dashboard data. Please log in again.");
          console.error("Dashboard API error:", err);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  async function handleAuthSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setAuthError("");
    setAuthLoading(true);

    try {
      if (authMode === "register") {
        await authService.register({ name, email, password });
      }

      const loggedInUser = await authService.login({ email, password });

      setUser(loggedInUser);
      setToken(localStorage.getItem("accessToken") || "");
      setPassword("");
    } catch (err: unknown) {
      console.error("Authentication error:", err);

      setAuthError(
        "Authentication failed. Check your details and make sure the backend server is running."
      );
    } finally {
      setAuthLoading(false);
    }
  }

  function handleLogout() {
    authService.logout();

    setToken("");
    setUser(null);
    setDashboard(null);
    setError("");
    setPassword("");
    setAuthMode("login");
  }

  if (!token) {
    return (
      <div className="auth-page">
        <section className="auth-card">
          <div className="brand auth-brand">
            <span className="brand-icon">C</span>
            <span>
              CareerPilot<span className="accent"> AI</span>
            </span>
          </div>

          <span className="eyebrow">YOUR CAREER COMMAND CENTER</span>

          <h1>
            {authMode === "login"
              ? "Welcome back."
              : "Create your account."}
          </h1>

          <p className="auth-description">
            {authMode === "login"
              ? "Sign in to continue building your future."
              : "Start planning your next career move with CareerPilot AI."}
          </p>

          <form className="auth-form" onSubmit={handleAuthSubmit}>
            {authMode === "register" && (
              <label>
                Full name

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  minLength={3}
                  maxLength={50}
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <label>
              Email address

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                maxLength={100}
                autoComplete={
                  authMode === "login"
                    ? "current-password"
                    : "new-password"
                }
                required
              />
            </label>

            {authError && (
              <div className="dashboard-error" role="alert">
                {authError}
              </div>
            )}

            <button
              className="primary-button auth-submit"
              type="submit"
              disabled={authLoading}
            >
              {authLoading
                ? "Please wait..."
                : authMode === "login"
                  ? "Sign in"
                  : "Create account"}
            </button>
          </form>

          <p className="auth-switch">
            {authMode === "login"
              ? "New to CareerPilot AI?"
              : "Already have an account?"}{" "}

            <button
              type="button"
              onClick={() => {
                setAuthMode(
                  authMode === "login" ? "register" : "login"
                );
                setAuthError("");
              }}
            >
              {authMode === "login"
                ? "Create an account"
                : "Sign in"}
            </button>
          </p>
        </section>
      </div>
    );
  }

  const stats = dashboard?.statistics;

  const statCards = [
    {
      title: "Resumes",
      value: stats?.totalResumes,
      description: "Track your resume activity",
      icon: "▤",
      color: "purple",
    },
    {
      title: "Portfolios",
      value: stats?.totalPortfolios,
      description: "Showcase your work",
      icon: "◈",
      color: "blue",
    },
    {
      title: "Career roadmaps",
      value: stats?.totalRoadmaps,
      description: "Plan your next steps",
      icon: "⌘",
      color: "green",
    },
    {
      title: "Interview practice",
      value: stats?.totalInterviews,
      description: "Prepare with confidence",
      icon: "◎",
      color: "orange",
    },
  ];

  const tools = [
    {
      title: "Resume Analyzer",
      description:
        "Review your resume and identify opportunities to improve it.",
      icon: "✧",
      color: "purple",
      href: "#resume",
    },
    {
      title: "Portfolio Builder",
      description:
        "Present your skills and projects in a professional portfolio.",
      icon: "◈",
      color: "blue",
      href: "#portfolio",
    },
    {
      title: "Career Roadmap",
      description:
        "Organize your learning goals into manageable milestones.",
      icon: "⌘",
      color: "green",
      href: "#roadmap",
    },
    {
      title: "Mock Interviews",
      description:
        "Practice interview questions and build your confidence.",
      icon: "◎",
      color: "orange",
      href: "#interviews",
    },
    {
      title: "Job Tracker",
      description:
        "Keep your job applications and opportunities organized.",
      icon: "⌕",
      color: "pink",
      href: "#jobs",
    },
    {
      title: "ATS Score Checker",
      description:
        "Compare your resume against a job description.",
      icon: "✦",
      color: "yellow",
      href: "#ats",
    },
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">C</span>
          <span>
            CareerPilot<span className="accent"> AI</span>
          </span>
        </div>

        <p className="nav-label">WORKSPACE</p>

        <nav>
          <a className="nav-item active" href="#dashboard">
            ▦ Dashboard
          </a>

          <a className="nav-item" href="#resume">
            ▤ Resume Analyzer
          </a>

          <a className="nav-item" href="#portfolio">
            ◈ Portfolio
          </a>

          <a className="nav-item" href="#roadmap">
            ⌘ Career Roadmap
          </a>

          <a className="nav-item" href="#interviews">
            ◎ Mock Interviews
          </a>

          <a className="nav-item" href="#jobs">
            ⌕ Job Tracker
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="avatar">
            {(user?.name || "B").charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{user?.name || "Career Builder"}</strong>
            <small>
              {user?.email || "Your career journey"}
            </small>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <span className="eyebrow">
              YOUR CAREER COMMAND CENTER
            </span>
            <h1>Dashboard</h1>
          </div>

          <button
            className="profile-button"
            type="button"
            onClick={handleLogout}
          >
            Sign out ↗
          </button>
        </header>

        {error && (
          <div className="dashboard-error" role="alert">
            <strong>Dashboard unavailable</strong>
            <p>{error}</p>

            <button type="button" onClick={handleLogout}>
              Sign in again
            </button>
          </div>
        )}

        <section className="welcome">
          <div>
            <span className="pill">
              ✧ YOUR NEXT CHAPTER STARTS HERE
            </span>

            <h2>
              Build your future.
              <br />
              <span>One step at a time.</span>
            </h2>

            <p>
              Manage your resume, sharpen your interview skills,
              and move closer to your dream role.
            </p>

            <button
              className="primary-button"
              type="button"
              onClick={() =>
                document.getElementById("tools")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Explore your tools <span>→</span>
            </button>
          </div>

          <div className="welcome-art">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />

            <div className="art-card">
              <span className="sparkle">✦</span>
              <div className="chart-icon">↗</div>

              <strong>Career growth</strong>
              <small>Your journey, your momentum.</small>

              <div className="progress">
                <span />
              </div>

              <small>Keep moving forward</small>
            </div>
          </div>
        </section>

        <section className="section-heading">
          <div>
            <h2>Your workspace</h2>
            <p>
              Everything you need to prepare for your next opportunity.
            </p>
          </div>

          <span className="live-indicator">
            <span />
            {loading
              ? "Syncing data"
              : error
                ? "Connection issue"
                : "Live overview"}
          </span>
        </section>

        <section className="stats-grid">
          {statCards.map((card) => (
            <article className="stat-card" key={card.title}>
              <span className={`stat-icon ${card.color}`}>
                {card.icon}
              </span>

              <p>{card.title}</p>

              <strong>
                {loading
                  ? "…"
                  : error
                    ? "—"
                    : (card.value ?? 0)}
              </strong>

              <small>{card.description}</small>
            </article>
          ))}
        </section>

        <section className="section-heading">
          <div>
            <h2>Recent activity</h2>
            <p>Your latest interview practice sessions.</p>
          </div>
        </section>

        <section className="activity-section">
          {loading ? (
            <p className="activity-message">
              Loading recent activity…
            </p>
          ) : error ? (
            <p className="activity-message">
              Recent activity will appear after the dashboard connects.
            </p>
          ) : dashboard?.recentActivity.interviews.length ? (
            <div className="activity-list">
              {dashboard.recentActivity.interviews.map((interview) => (
                <article
                  className="activity-item"
                  key={interview.id}
                >
                  <span className="stat-icon orange">◎</span>

                  <div className="activity-details">
                    <strong>{interview.jobRole}</strong>

                    <small>
                      {interview.difficulty} difficulty ·{" "}
                      {new Date(
                        interview.createdAt
                      ).toLocaleDateString()}
                    </small>
                  </div>

                  <span className="activity-score">
                    {interview.score == null
                      ? "Not scored"
                      : `${interview.score} points`}
                  </span>
                </article>
              ))}
            </div>
          ) : (
            <p className="activity-message">
              No interview sessions yet. Your recent activity will
              appear here.
            </p>
          )}
        </section>

        <section className="tools-section" id="tools">
          <div className="section-heading">
            <div>
              <h2>Explore your tools</h2>
              <p>
                Choose a tool to get started with your career preparation.
              </p>
            </div>
          </div>

          <div className="tools-grid">
            {tools.map((tool) => (
              <article className="tool-card" key={tool.title}>
                <span className={`tool-icon ${tool.color}`}>
                  {tool.icon}
                </span>

                <h3>{tool.title}</h3>
                <p>{tool.description}</p>

                <a href={tool.href}>
                  Explore tool <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Resume Analyzer integration */}
        <ResumeAnalyzer />

        <footer className="footer">
          <span>CareerPilot AI</span>
          <span>
            Designed for your next opportunity ✦
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;
