import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const SAFE: React.CSSProperties = {
  justifyContent: "center", alignItems: "center",
  paddingTop: 150, paddingBottom: 280, paddingLeft: 40, paddingRight: 90,
};

const formatStars = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
};

export const RepoCard: React.FC<{
  rank: number;
  name: string;
  owner: string;
  stars: number;
  description: string;
  language: string;
  forks: number;
  isKing?: boolean;
}> = ({ rank, name, owner, stars, description, language, forks, isKing }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const color = isKing ? "#FBBF24" : rank <= 2 ? "#A855F7" : "#38BDF8";

  const cardPop = spring({ fps, frame, config: { damping: 14 } });
  const rankPop = spring({ fps, frame: frame - 5, config: { damping: 10, stiffness: 150 } });
  const starsPop = spring({ fps, frame: frame - 15, config: { damping: 18, stiffness: 60 } });
  const detailsPop = spring({ fps, frame: frame - 22, config: { damping: 14 } });

  const currentStars = interpolate(starsPop, [0, 1], [0, stars]);
  const glowSize = 30 + Math.sin(frame * 0.08) * 15;
  const float = cardPop >= 0.99 ? Math.sin(frame * 0.04) * 4 : 0;

  return (
    <AbsoluteFill style={SAFE}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 45%, ${color}15 0%, transparent 50%)`,
      }} />

      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: `1.5px solid ${color}35`,
        borderRadius: 36, padding: "45px 50px", width: 880,
        boxShadow: `0 0 ${glowSize}px ${color}18, inset 0 1px 0 rgba(255,255,255,0.05)`,
        display: "flex", flexDirection: "column", gap: 20,
        transform: `scale(${cardPop}) translateY(${(1 - cardPop) * 60 + float}px)`,
        opacity: cardPop,
      }}>
        {/* Rank badge */}
        <div style={{
          transform: `scale(${rankPop})`, textAlign: "center",
        }}>
          {isKing && (
            <div style={{ fontSize: 50, marginBottom: -5 }}>👑</div>
          )}
          <div style={{
            fontSize: isKing ? 120 : 90, fontWeight: 900,
            fontFamily: "Poppins, sans-serif", color,
            lineHeight: 1, textShadow: `0 0 30px ${color}50`,
          }}>
            #{rank}
          </div>
        </div>

        {/* Repo name */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: 22, color: "#888", fontFamily: "Poppins, sans-serif",
            letterSpacing: 3,
          }}>
            {owner}
          </div>
          <div style={{
            fontSize: isKing ? 52 : 46, fontWeight: 900,
            fontFamily: "Poppins, sans-serif", color: "#FFF",
            marginTop: 4, lineHeight: 1.1,
            textShadow: isKing ? `0 0 20px ${color}40` : "none",
          }}>
            {name}
          </div>
        </div>

        {/* Star count */}
        <div style={{
          textAlign: "center", transform: `scale(${starsPop})`,
          marginTop: 8,
        }}>
          <div style={{
            fontSize: 70, fontWeight: 900, fontFamily: "Poppins, sans-serif",
            color, textShadow: `0 0 25px ${color}40`,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 16,
          }}>
            <span style={{ fontSize: 50 }}>⭐</span>
            {formatStars(Math.round(currentStars))}
          </div>
          <div style={{
            fontSize: 20, color: "#888", fontFamily: "Poppins, sans-serif",
            letterSpacing: 4, marginTop: 4,
          }}>
            GITHUB STARS
          </div>
        </div>

        {/* Description */}
        <div style={{
          fontSize: 22, color: "#aaa", fontFamily: "Poppins, sans-serif",
          textAlign: "center", lineHeight: 1.5, marginTop: 8,
          opacity: detailsPop, transform: `translateY(${(1 - detailsPop) * 15}px)`,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          overflow: "hidden", padding: "0 20px",
        }}>
          {description || "No description available"}
        </div>

        {/* Meta row: language + forks */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 40, marginTop: 8,
          opacity: detailsPop,
        }}>
          {language && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: color }} />
              <span style={{ fontSize: 20, color: "#999", fontFamily: "Poppins, sans-serif" }}>{language}</span>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>🍴</span>
            <span style={{ fontSize: 20, color: "#999", fontFamily: "Poppins, sans-serif" }}>{formatStars(forks)} forks</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
