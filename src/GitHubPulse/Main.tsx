import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  delayRender,
  continueRender,
  spring,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { HyperText } from "../components/HyperText";
import { Background } from "../components/Background";
import { Watermark } from "../components/Watermark";
import { RepoCard } from "./RepoCard";

/* ── Types ─────────────────────────────────────────────── */

interface Repo {
  id: number;
  name: string;
  full_name: string;
  owner: { login: string };
  stargazers_count: number;
  forks_count: number;
  description: string | null;
  language: string | null;
}

/* ── Fallback data ─────────────────────────────────────── */

const FALLBACK_REPOS: Repo[] = [
  { id: 1, name: "transformers", full_name: "huggingface/transformers", owner: { login: "huggingface" }, stargazers_count: 142000, forks_count: 28000, description: "State-of-the-art ML for PyTorch, TensorFlow, and JAX", language: "Python" },
  { id: 2, name: "ollama", full_name: "ollama/ollama", owner: { login: "ollama" }, stargazers_count: 125000, forks_count: 9500, description: "Get up and running with large language models", language: "Go" },
  { id: 3, name: "langchain", full_name: "langchain-ai/langchain", owner: { login: "langchain-ai" }, stargazers_count: 98000, forks_count: 15000, description: "Build context-aware reasoning applications", language: "Python" },
  { id: 4, name: "stable-diffusion-webui", full_name: "AUTOMATIC1111/stable-diffusion-webui", owner: { login: "AUTOMATIC1111" }, stargazers_count: 145000, forks_count: 27000, description: "Stable Diffusion web UI", language: "Python" },
  { id: 5, name: "gpt4all", full_name: "nomic-ai/gpt4all", owner: { login: "nomic-ai" }, stargazers_count: 72000, forks_count: 7900, description: "Run open-source large language models locally", language: "C++" },
];

/* ── Safe zone ─────────────────────────────────────────── */

const SAFE: React.CSSProperties = {
  justifyContent: "center", alignItems: "center",
  paddingTop: 150, paddingBottom: 280, paddingLeft: 40, paddingRight: 90,
};

/* ── Summary Scene ─────────────────────────────────────── */

const SummaryScene: React.FC<{ repos: Repo[] }> = ({ repos }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titlePop = spring({ fps, frame: frame - 3, config: { damping: 12 } });

  return (
    <AbsoluteFill style={SAFE}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, width: 900 }}>
        <div style={{ transform: `scale(${titlePop})`, textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 42, fontWeight: 900, fontFamily: "Poppins, sans-serif", color: "#FFF" }}>LEADERBOARD</div>
          <div style={{ fontSize: 20, color: "#888", fontFamily: "Poppins, sans-serif", letterSpacing: 4, marginTop: 4 }}>TOP 5 AI REPOS RIGHT NOW</div>
        </div>

        {repos.map((repo, i) => {
          const pop = spring({ fps, frame: frame - 10 - i * 8, config: { damping: 14 } });
          const color = i === 0 ? "#FBBF24" : i < 3 ? "#A855F7" : "#38BDF8";
          return (
            <div key={repo.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              width: "100%", padding: "18px 24px",
              background: "rgba(255,255,255,0.03)", border: `1.5px solid ${color}20`,
              borderRadius: 18,
              transform: `translateX(${(1 - pop) * (i % 2 === 0 ? 60 : -60)}px)`, opacity: pop,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ fontSize: 30, fontWeight: 900, fontFamily: "Poppins, sans-serif", color, width: 50 }}>#{i + 1}</div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "Poppins, sans-serif", color: "#FFF" }}>{repo.name}</div>
                  <div style={{ fontSize: 16, color: "#888", fontFamily: "Poppins, sans-serif" }}>{repo.owner.login}</div>
                </div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "Poppins, sans-serif", color }}>
                ⭐ {(repo.stargazers_count / 1000).toFixed(1)}k
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ── Main Composition ──────────────────────────────────── */

export const GitHubPulseMain: React.FC = () => {
  const [handle] = useState(() => delayRender("Fetching GitHub AI repos..."));
  const [repos, setRepos] = useState<Repo[]>([]);
  const [fetchDate, setFetchDate] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/search/repositories?q=topic:ai+stars:>1000&sort=stars&order=desc&per_page=5"
        );
        const json = await res.json();
        setRepos(json.items ?? []);
        setFetchDate(new Date().toLocaleString());
      } catch (err) {
        console.error("GitHub API failed, using fallback:", err);
        setRepos(FALLBACK_REPOS);
        setFetchDate(new Date().toLocaleString() + " (offline)");
      } finally {
        continueRender(handle);
      }
    };
    fetchRepos();
  }, [handle]);

  if (repos.length === 0) return null;

  // Reverse for countdown: #5 → #1
  const countdown = [...repos].reverse();

  const CARD = 130;
  const TRANS = 15;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B1120", overflow: "hidden" }}>
      <Background />

      <TransitionSeries>
        {/* 1: Hook */}
        <TransitionSeries.Sequence durationInFrames={100}>
          <AbsoluteFill style={SAFE}>
            <div style={{
              background: "rgba(168,85,247,0.15)", border: "2px solid rgba(168,85,247,0.4)",
              borderRadius: 16, padding: "10px 40px", marginBottom: 20,
            }}>
              <HyperText text="LIVE" delay={3} color="#A855F7" size={40} />
            </div>
            <HyperText text="GITHUB" delay={8} color="#38BDF8" size={80} />
            <div style={{ height: 10 }} />
            <HyperText text="AI PULSE" delay={16} color="#FFF" size={90} />
            <div style={{ height: 25 }} />
            <HyperText text="TOP 5 TRENDING" delay={28} color="#EF4444" size={36} />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* 2-6: Repos #5 down to #1 */}
        {countdown.map((repo, i) => (
          <React.Fragment key={repo.id}>
            <TransitionSeries.Transition
              presentation={i === countdown.length - 1 ? fade() : slide({ direction: "from-bottom" })}
              timing={linearTiming({ durationInFrames: TRANS })}
            />
            <TransitionSeries.Sequence durationInFrames={i === countdown.length - 1 ? 160 : CARD}>
              <RepoCard
                rank={5 - i}
                name={repo.name}
                owner={repo.owner.login}
                stars={repo.stargazers_count}
                description={repo.description ?? ""}
                language={repo.language ?? ""}
                forks={repo.forks_count}
                isKing={i === countdown.length - 1}
              />
            </TransitionSeries.Sequence>
          </React.Fragment>
        ))}

        {/* 7: Summary leaderboard */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />
        <TransitionSeries.Sequence durationInFrames={160}>
          <SummaryScene repos={repos} />
        </TransitionSeries.Sequence>

        {/* 8: Outro */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />
        <TransitionSeries.Sequence durationInFrames={150}>
          <AbsoluteFill style={SAFE}>
            <HyperText text="STAY AHEAD OF" delay={5} color="#A855F7" size={50} />
            <div style={{ height: 10 }} />
            <HyperText text="THE AI CURVE" delay={15} size={55} />
            <div style={{ height: 50 }} />
            <div style={{
              fontSize: 52, fontWeight: 900, fontFamily: "Poppins, sans-serif",
              color: "#38BDF8", letterSpacing: 4, textShadow: "0 0 30px rgba(56,189,248,0.4)",
              textAlign: "center",
            }}>
              @mogingerstudios
            </div>
            <div style={{ height: 30 }} />
            <div style={{ fontSize: 20, color: "#666", fontFamily: "Poppins, sans-serif" }}>
              Data pulled live at {fetchDate}
            </div>
          </AbsoluteFill>
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Watermark />
    </AbsoluteFill>
  );
};
