import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { Logo } from "../components/Logo";

// Video 1: Hero Intro (10s / 300 frames @ 30fps)
// Hook → Problem → Solution → Social proof → CTA

export const HeroVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = (start: number, end: number) =>
    interpolate(frame, [start, end], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

  const slideUp = (start: number, end: number, px = 60) =>
    interpolate(frame, [start, end], [px, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

  const scaleIn = (startFrame: number) =>
    spring({ frame: frame - startFrame, fps, config: { damping: 18, stiffness: 120 } });

  // Section timings (frames)
  const LOGO_IN = 0;
  const HOOK_IN = 40;
  const PROBLEM_IN = 90;
  const SOLUTION_IN = 150;
  const STATS_IN = 210;
  const CTA_IN = 255;

  // Background gradient animation
  const bgShift = interpolate(frame, [0, 300], [0, 30], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(${160 + bgShift}deg, #1e1b4b 0%, #312e81 30%, #4c1d95 60%, #1e1b4b 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
          opacity: fadeIn(0, 60),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
          opacity: fadeIn(30, 90),
        }}
      />

      {/* Logo */}
      <div
        style={{
          marginTop: 160,
          opacity: fadeIn(LOGO_IN, LOGO_IN + 30),
          transform: `scale(${scaleIn(LOGO_IN)}) translateY(${slideUp(LOGO_IN, LOGO_IN + 30)}px)`,
        }}
      >
        <Logo size={100} />
      </div>
      <div
        style={{
          marginTop: 20,
          opacity: fadeIn(LOGO_IN + 10, LOGO_IN + 40),
          color: "rgba(255,255,255,0.7)",
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Offert Pro
      </div>

      {/* Hook line */}
      <div
        style={{
          marginTop: 100,
          opacity: fadeIn(HOOK_IN, HOOK_IN + 25),
          transform: `translateY(${slideUp(HOOK_IN, HOOK_IN + 25, 50)}px)`,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: "#e0e7ff",
            lineHeight: 1.2,
          }}
        >
          Trött på att offerter tar
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "#fbbf24",
            lineHeight: 1.1,
            marginTop: 8,
          }}
        >
          timmar att skapa?
        </div>
      </div>

      {/* Problem */}
      <div
        style={{
          marginTop: 80,
          opacity: fadeIn(PROBLEM_IN, PROBLEM_IN + 25),
          transform: `translateY(${slideUp(PROBLEM_IN, PROBLEM_IN + 25, 50)}px)`,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <div style={{ fontSize: 38, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>
          De flesta företag lägger{" "}
          <span style={{ color: "#f87171", fontWeight: 700 }}>3–5 timmar</span> per offert.
        </div>
      </div>

      {/* Solution */}
      <div
        style={{
          marginTop: 70,
          opacity: fadeIn(SOLUTION_IN, SOLUTION_IN + 30),
          transform: `translateY(${slideUp(SOLUTION_IN, SOLUTION_IN + 30, 50)}px)`,
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            background: "linear-gradient(135deg, #a5b4fc, #c4b5fd, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.15,
          }}
        >
          Med Offert Pro tar det bara 2 minuter.
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          marginTop: 80,
          opacity: fadeIn(STATS_IN, STATS_IN + 30),
          transform: `translateY(${slideUp(STATS_IN, STATS_IN + 30, 40)}px)`,
          display: "flex",
          gap: 40,
          justifyContent: "center",
        }}
      >
        {[
          { value: "500+", label: "företag" },
          { value: "4.9★", label: "betyg" },
          { value: "40%", label: "fler affärer" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              textAlign: "center",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 24,
              padding: "28px 36px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div style={{ fontSize: 52, fontWeight: 900, color: "#a5b4fc" }}>{stat.value}</div>
            <div style={{ fontSize: 28, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: 90,
          opacity: fadeIn(CTA_IN, CTA_IN + 25),
          transform: `scale(${scaleIn(CTA_IN)})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            borderRadius: 60,
            padding: "36px 80px",
            fontSize: 44,
            fontWeight: 800,
            color: "#fff",
            boxShadow: "0 12px 48px rgba(99,102,241,0.5)",
          }}
        >
          Prova gratis →
        </div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.4)", marginTop: 20 }}>
          offertpro.se
        </div>
      </div>
    </div>
  );
};
