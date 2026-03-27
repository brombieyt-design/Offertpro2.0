import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { Logo } from "../components/Logo";

// Video 3: CTA / Pricing (9s / 270 frames @ 30fps)
// Urgency → Free plan → CTA

const PLANS = [
  { name: "Gratis", price: "0 kr", highlight: false, features: ["5 offerter/mån", "PDF-export", "E-post leverans"] },
  { name: "Pro", price: "499 kr/mån", highlight: true, features: ["Obegränsade offerter", "Realtidsspårning", "E-signaturer", "Avancerad analys"] },
];

export const CTAVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = (start: number, end: number) =>
    interpolate(frame, [start, end], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

  const slideUp = (start: number, end: number, px = 50) =>
    interpolate(frame, [start, end], [px, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

  const scaleIn = (startFrame: number) =>
    spring({ frame: frame - startFrame, fps, config: { damping: 16, stiffness: 120 } });

  // Pulsing glow for CTA button
  const pulse = interpolate(
    (frame - 200) % 60,
    [0, 30, 60],
    [1, 1.04, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const bgAngle = interpolate(frame, [0, 270], [145, 175], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(${bgAngle}deg, #0f172a 0%, #1e1b4b 35%, #312e81 65%, #0f172a 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background glow orbs */}
      <div
        style={{
          position: "absolute",
          top: 100,
          right: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
          opacity: fadeIn(20, 60),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          opacity: fadeIn(40, 80),
        }}
      />

      {/* Logo + brand */}
      <div
        style={{
          marginTop: 130,
          opacity: fadeIn(0, 25),
          transform: `scale(${scaleIn(0)})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo size={90} />
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.6)", marginTop: 16, fontWeight: 600 }}>
          Offert Pro
        </div>
      </div>

      {/* Headline */}
      <div
        style={{
          marginTop: 80,
          opacity: fadeIn(35, 60),
          transform: `translateY(${slideUp(35, 60)}px)`,
          textAlign: "center",
          padding: "0 70px",
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 800, color: "rgba(255,255,255,0.7)", lineHeight: 1.3 }}>
          Börja skapa professionella offerter
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            background: "linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 50%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
            marginTop: 8,
          }}
        >
          idag — gratis.
        </div>
      </div>

      {/* Plan cards */}
      <div
        style={{
          marginTop: 70,
          display: "flex",
          gap: 28,
          padding: "0 50px",
          opacity: fadeIn(80, 110),
          transform: `translateY(${slideUp(80, 110, 60)}px)`,
        }}
      >
        {PLANS.map((plan, i) => (
          <div
            key={plan.name}
            style={{
              flex: 1,
              background: plan.highlight
                ? "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))"
                : "rgba(255,255,255,0.05)",
              border: plan.highlight
                ? "2px solid rgba(99,102,241,0.7)"
                : "1px solid rgba(255,255,255,0.1)",
              borderRadius: 28,
              padding: "44px 36px",
              textAlign: "center",
              backdropFilter: "blur(12px)",
              position: "relative",
              boxShadow: plan.highlight ? "0 8px 40px rgba(99,102,241,0.3)" : "none",
            }}
          >
            {plan.highlight && (
              <div
                style={{
                  position: "absolute",
                  top: -18,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                  borderRadius: 20,
                  padding: "8px 28px",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#fff",
                  whiteSpace: "nowrap",
                }}
              >
                Populärast
              </div>
            )}
            <div style={{ fontSize: 38, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
              {plan.name}
            </div>
            <div
              style={{
                fontSize: plan.highlight ? 44 : 36,
                fontWeight: 900,
                color: plan.highlight ? "#a5b4fc" : "rgba(255,255,255,0.5)",
                marginBottom: 28,
              }}
            >
              {plan.price}
            </div>
            {plan.features.map((f) => (
              <div
                key={f}
                style={{
                  fontSize: 26,
                  color: "rgba(255,255,255,0.65)",
                  padding: "8px 0",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  textAlign: "left",
                }}
              >
                <span style={{ color: "#10b981", fontSize: 22 }}>✓</span>
                {f}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <div
        style={{
          marginTop: 60,
          opacity: fadeIn(140, 165),
          transform: `translateY(${slideUp(140, 165, 40)}px)`,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <div style={{ fontSize: 34, color: "rgba(255,255,255,0.55)", fontStyle: "italic", lineHeight: 1.5 }}>
          "Vår acceptansgrad ökade med{" "}
          <span style={{ color: "#fbbf24", fontWeight: 700, fontStyle: "normal" }}>40%</span>{" "}
          första månaden."
        </div>
        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.35)", marginTop: 16 }}>
          — Marcus T., Blue Ridge Construction
        </div>
      </div>

      {/* CTA button */}
      <div
        style={{
          marginTop: 70,
          opacity: fadeIn(190, 215),
          transform: `scale(${frame > 200 ? pulse : scaleIn(190)})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            borderRadius: 70,
            padding: "40px 90px",
            fontSize: 48,
            fontWeight: 900,
            color: "#fff",
            boxShadow: "0 16px 60px rgba(99,102,241,0.55)",
            letterSpacing: "-0.01em",
          }}
        >
          Kom igång gratis →
        </div>
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.35)",
            marginTop: 18,
          }}
        >
          Inget kreditkort krävs · offertpro.se
        </div>
      </div>
    </div>
  );
};
