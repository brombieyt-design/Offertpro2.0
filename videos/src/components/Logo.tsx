import React from "react";

export const Logo: React.FC<{ size?: number }> = ({ size = 80 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
      }}
    >
      <span
        style={{
          color: "#fff",
          fontSize: size * 0.38,
          fontWeight: 900,
          fontFamily: "sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        OP
      </span>
    </div>
  );
};
