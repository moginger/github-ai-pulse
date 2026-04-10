import React, { useEffect, useState } from "react";
import { Player } from "@remotion/player";
import { GitHubPulseMain } from "../GitHubPulse/Main";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  stargazers_count: number;
  description: string | null;
  language: string | null;
}

const formatStars = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

export const App: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    fetch(
      "https://api.github.com/search/repositories?q=topic:ai+stars:>1000&sort=stars&order=desc&per_page=5"
    )
      .then((r) => r.json())
      .then((d) => setRepos(d.items ?? []))
      .catch(() => {});
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 20px 80px",
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: 50, maxWidth: 800 }}>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 900,
            letterSpacing: -2,
            background: "linear-gradient(135deg, #38BDF8, #A855F7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
          }}
        >
          GitHub AI Pulse
        </h1>
        <p
          style={{
            color: "#94A3B8",
            fontSize: 18,
            marginTop: 16,
            lineHeight: 1.7,
          }}
        >
          Real-time market intelligence for the AI ecosystem.
          <br />
          Top trending AI repositories on GitHub, updated live.
        </p>
      </header>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          gap: 50,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          maxWidth: 1100,
          width: "100%",
        }}
      >
        {/* Video Player */}
        <section
          style={{
            borderRadius: 24,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 80px rgba(56,189,248,0.12)",
            flexShrink: 0,
          }}
        >
          <Player
            component={GitHubPulseMain}
            durationInFrames={1200}
            compositionWidth={1080}
            compositionHeight={1920}
            fps={30}
            style={{ width: 340, height: 604 }}
            controls
            autoPlay
            loop
          />
        </section>

        {/* Right panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            flex: 1,
            minWidth: 300,
            maxWidth: 450,
          }}
        >
          {/* Live repos list */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: 30,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                letterSpacing: 4,
                color: "#38BDF8",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Live Top 5 AI Repos
            </h2>
            {repos.length === 0 && (
              <p style={{ color: "#666" }}>Loading...</p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {repos.map((repo, i) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 12,
                    textDecoration: "none",
                    color: "inherit",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(56,189,248,0.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.06)")
                  }
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 900,
                        color: i === 0 ? "#FBBF24" : "#A855F7",
                        width: 30,
                      }}
                    >
                      #{i + 1}
                    </span>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>
                        {repo.name}
                      </div>
                      <div style={{ fontSize: 12, color: "#666" }}>
                        {repo.full_name}
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#FBBF24",
                    }}
                  >
                    ⭐ {formatStars(repo.stargazers_count)}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: 30,
            }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>
              Moginger Studios
            </h2>
            <p
              style={{
                color: "#94A3B8",
                fontSize: 15,
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              We build automated visual intelligence systems. Turn live
              data into cinematic content — crypto trackers, AI dashboards,
              and more.
            </p>
            <a
              href="https://youtube.com/@mogingerstudios"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                background: "linear-gradient(135deg, #38BDF8, #A855F7)",
                color: "#FFF",
                padding: 16,
                borderRadius: 12,
                fontWeight: 800,
                textDecoration: "none",
                fontSize: 16,
              }}
            >
              Subscribe on YouTube
            </a>
          </div>

          {/* Features */}
          <div style={{ padding: "0 4px" }}>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                "Real-time GitHub API integration",
                "Automated video generation",
                "Zero API keys required",
                "Free to host on GitHub Pages",
              ].map((item) => (
                <li
                  key={item}
                  style={{ color: "#94A3B8", fontSize: 14 }}
                >
                  ✓ {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: 60,
          color: "#444",
          fontSize: 13,
          textAlign: "center",
        }}
      >
        Built by @mogingerstudios — Data from GitHub API (public, no auth required)
      </footer>
    </main>
  );
};
