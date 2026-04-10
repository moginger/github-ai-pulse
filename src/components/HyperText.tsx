import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const HyperText: React.FC<{
  text: string;
  delay?: number;
  color?: string;
  size?: number;
}> = ({ text, delay = 0, color = "#FFF", size = 80 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const spr = spring({ fps, frame: frame - delay, config: { damping: 12, stiffness: 120 } });
  const y = interpolate(spr, [0, 1], [60, 0]);
  const float = spr >= 0.99 ? Math.sin((frame - delay) * 0.05) * 3 : 0;

  return (
    <div style={{
      fontSize: size, fontWeight: 900, fontFamily: "Poppins, sans-serif",
      color, letterSpacing: 6, textAlign: "center",
      transform: `translateY(${y + float}px)`, opacity: spr,
      textShadow: `0 0 40px ${color}40, 0 4px 20px rgba(0,0,0,0.5)`,
    }}>
      {text}
    </div>
  );
};
