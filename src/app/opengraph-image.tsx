import { ImageResponse } from "next/og";

export const alt = "Offert Pro – Professionella offerter och fakturor för småföretag";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default async function OgImage() {
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
        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
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
          <span style={{ color: "white", fontSize: "32px", fontWeight: 700 }}>
            Offert Pro
          </span>
        </div>

        {/* Main text */}
        <h1
          style={{
            color: "white",
            fontSize: "56px",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.2,
            margin: "0 0 24px 0",
            maxWidth: "900px",
          }}
        >
          Skapa professionella offerter & fakturor
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "24px",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          PDF-export, e-signaturer, realtidsspårning. Gratis att börja.
        </p>

        {/* Bottom badges */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "48px",
          }}
        >
          {["500+ företag", "4.9/5 betyg", "100% gratis start"].map((text) => (
            <div
              key={text}
              style={{
                background: "rgba(255,255,255,0.15)",
                padding: "10px 24px",
                borderRadius: "999px",
                color: "white",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
