import React from "react";
import { useCurrentFrame } from "remotion";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: 50 }, (_, i) => {
    const x = (i * 137) % 1080;
    const baseY = (i * 251) % 1920;
    const y = (baseY - frame * (0.2 + (i % 5) * 0.15) + 1920) % 1920;
    const size = 1 + (i % 5) * 0.8;
    const opacity = 0.04 + (i % 7) * 0.03 + Math.sin(frame * 0.03 + i) * 0.015;
    return { x, y, size, opacity };
  });

  const orb1X = 540 + Math.sin(frame * 0.008) * 200;
  const orb1Y = 600 + Math.cos(frame * 0.006) * 300;
  const orb2X = 540 + Math.cos(frame * 0.01) * 250;
  const orb2Y = 1300 + Math.sin(frame * 0.007) * 250;

  return (
    <>
      <div style={{ position: "absolute", left: orb1X - 350, top: orb1Y - 350, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 65%)" }} />
      <div style={{ position: "absolute", left: orb2X - 300, top: orb2Y - 300, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 65%)" }} />

      <svg width="1080" height="1920" style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
        {Array.from({ length: 25 }).map((_, i) => (
          <React.Fragment key={i}>
            <line x1={0} y1={i * 80} x2={1080} y2={i * 80} stroke="#38BDF8" strokeWidth={1} />
            <line x1={i * 80} y1={0} x2={i * 80} y2={1920} stroke="#38BDF8" strokeWidth={1} />
          </React.Fragment>
        ))}
      </svg>

      <svg width="1080" height="1920" style={{ position: "absolute", inset: 0 }}>
        {particles.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.size}
            fill={i % 3 === 0 ? "#A855F7" : "#38BDF8"} opacity={p.opacity} />
        ))}
      </svg>

      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.25) 100%)" }} />
    </>
  );
};
