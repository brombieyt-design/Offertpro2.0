import { ImageResponse } from "next/og";
import { getBlogPost } from "@/content/blog-posts";

export const alt = "Offert Pro Blogg";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default async function BlogOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  const title = post?.title ?? "Offert Pro Blogg";
  const category = post?.category ?? "Artikel";
  const author = post?.author ?? "Offert Pro";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #4F46E5 60%, #7C3AED 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top: category + logo */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "white",
              padding: "8px 20px",
              borderRadius: "999px",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            {category}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "white",
                fontWeight: 700,
              }}
            >
              OP
            </div>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "20px", fontWeight: 600 }}>
              Offert Pro
            </span>
          </div>
        </div>

        {/* Middle: title */}
        <h1
          style={{
            color: "white",
            fontSize: title.length > 60 ? "42px" : "52px",
            fontWeight: 800,
            lineHeight: 1.2,
            margin: 0,
            maxWidth: "900px",
          }}
        >
          {title}
        </h1>

        {/* Bottom: author */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            {author.split(" ").map((n) => n[0]).join("")}
          </div>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "20px" }}>
            {author}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
