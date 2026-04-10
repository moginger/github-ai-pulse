import React from "react";

export const Watermark: React.FC<{ handle?: string }> = ({
  handle = "@mogingerstudios",
}) => (
  <div style={{
    position: "absolute", top: 170, left: 0, right: 0,
    textAlign: "center", fontSize: 26, fontWeight: 700,
    fontFamily: "Poppins, sans-serif",
    color: "rgba(255,255,255,0.3)", letterSpacing: 3, zIndex: 100,
  }}>
    {handle}
  </div>
);
