import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Easing,
  Sequence,
} from "remotion";
import { Logo } from "../components/Logo";

// Video 2: Features showcase (15s / 450 frames @ 30fps)
// Shows 5 key features one at a time with icons

const FEATURES = [
  {
    icon: "📄",
    title: "Snygga PDF:er",
    desc: "Professionella offerter med din logotyp och dina färger — på sekunder.",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.4)",
  },
  {
    icon: "👁️",
    title: "Realtidsspårning",
    desc: "Få en notis exakt när kunden öppnar och läser din offert.",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.4)",
  },
  {
    icon: "✍️",
    title: "E-signaturer",
    desc: "Kunden signerar digitalt. Juridiskt bindande. Inga utskrifter.",
    color: "#10b981",
    glow: "rgba(16,185,129,0.4)",
  },
  {
    icon: "🔔",
    title: "Auto-påminnelser",
    desc: "Systemet skickar uppföljningar vid rätt tidpunkt automatiskt.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.4)",
  },
  {
    icon: "📊",
    title: "Statuspipeline",
    desc: "Se alla affärer i en visuell pipeline — från offert till betalad faktura.",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.4)",
  },
];

const FEATURE_DURATION = 80; // frames per feature
const HEADER_DURATION = 50;

const FeatureCard: React.FC<{
  feature: (typeof FEATURES)[0];
  startFrame: number;
}> = ({ feature, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;
  const endFrame = FEATURE_DURATION;

  const opacity = interpolate(localFrame, [0, 20, endFrame - 15, endFrame], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slideY = interpolate(localFrame, [0, 20], [80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const iconScale = spring({ frame: localFrame - 5, fps, config: { damping: 14, stiffness: 130 } });
  const cardScale = spring({ frame: localFrame, fps, config: { damping: 20, stiffness: 100 } });

  if (localFrame < 0 || localFrame > endFrame) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${slideY}px) scale(${cardScale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "0 80px",
        width: "100%",
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${feature.color}33, ${feature.color}11)`,
          border: `4px solid ${feature.color}66`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 90,
          transform: `scale(${iconScale})`,
          boxShadow: `0 0 60px ${feature.glow}`,
          marginBottom: 60,
        }}
      >
        {feature.icon}
      </div>

      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1.1,
          marginBottom: 32,
        }}
      >
        {feature.title}
      </div>

      <div
        style={{
          fontSize: 40,
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.5,
          maxWidth: 800,
        }}
      >
        {feature.desc}
      </div>

      {/* Colored accent line */}
      <div
        style={{
          marginTop: 50,
          width: interpolate(localFrame, [10, 40], [0, 300], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 6,
          borderRadius: 3,
          background: `linear-gradient(90deg, ${feature.color}, ${feature.color}66)`,
        }}
      />
    </div>
  );
};

export const FeaturesVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 25, 40, HEADER_DURATION], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headerScale = spring({ frame, fps, config: { damping: 18, stiffness: 110 } });

  // Progress dots
  const currentFeature = Math.min(
    Math.floor((frame - HEADER_DURATION) / FEATURE_DURATION),
    FEATURES.length - 1
  );

  const bgAngle = interpolate(frame, [0, 450], [150, 200], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(${bgAngle}deg, #0f0e1a 0%, #1e1b4b 40%, #2d1b69 80%, #0f0e1a 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top glow */}
      <div
        style={{
          position: "absolute",
          top: -300,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header (shown at start) */}
      <Sequence from={0} durationInFrames={HEADER_DURATION}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: headerOpacity,
            transform: `scale(${headerScale})`,
          }}
        >
          <Logo size={110} />
          <div
            style={{
              marginTop: 40,
              fontSize: 64,
              fontWeight: 900,
              color: "#fff",
              textAlign: "center",
              padding: "0 80px",
              lineHeight: 1.15,
            }}
          >
            Allt du behöver för att stänga fler affärer
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 36,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            5 kraftfulla funktioner
          </div>
        </div>
      </Sequence>

      {/* Feature cards */}
      {FEATURES.map((feature, i) => (
        <Sequence
          key={feature.title}
          from={HEADER_DURATION + i * FEATURE_DURATION}
          durationInFrames={FEATURE_DURATION}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FeatureCard
              feature={feature}
              startFrame={HEADER_DURATION + i * FEATURE_DURATION}
            />
          </div>
        </Sequence>
      ))}

      {/* Progress dots (always visible after header) */}
      {frame >= HEADER_DURATION && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            display: "flex",
            gap: 16,
            opacity: interpolate(frame, [HEADER_DURATION, HEADER_DURATION + 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {FEATURES.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === currentFeature ? 48 : 16,
                height: 16,
                borderRadius: 8,
                background: i === currentFeature ? "#6366f1" : "rgba(255,255,255,0.25)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      )}

      {/* Bottom brand */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          fontSize: 28,
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.08em",
        }}
      >
        offertpro.se
      </div>
    </div>
  );
};
