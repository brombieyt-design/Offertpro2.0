import { ImageResponse } from "next/og";

export const alt = "Offert Pro – Priser och planer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default async function PricingOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #4F46E5 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              color: "white",
              fontWeight: 700,
            }}
          >
            OP
          </div>
          <span style={{ color: "white", fontSize: "32px", fontWeight: 700 }}>Offert Pro</span>
        </div>

        {/* Headline */}
        <h1
          style={{
            color: "white",
            fontSize: "52px",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.2,
            margin: "0 0 24px 0",
          }}
        >
          Enkla & transparenta priser
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "24px",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.5,
            marginBottom: "48px",
          }}
        >
          Börja gratis – uppgradera när du växer
        </p>

        {/* Price cards */}
        <div style={{ display: "flex", gap: "20px" }}>
          {[
            { name: "Gratis", price: "0 kr" },
            { name: "Starter", price: "149 kr" },
            { name: "Pro", price: "399 kr" },
            { name: "Enterprise", price: "999 kr" },
          ].map((tier) => (
            <div
              key={tier.name}
              style={{
                background: tier.name === "Pro" ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)",
                padding: "20px 32px",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                border: tier.name === "Pro" ? "2px solid rgba(255,255,255,0.4)" : "none",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px", fontWeight: 500 }}>
                {tier.name}
              </span>
              <span style={{ color: "white", fontSize: "28px", fontWeight: 700 }}>
                {tier.price}
              </span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>/mån</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
