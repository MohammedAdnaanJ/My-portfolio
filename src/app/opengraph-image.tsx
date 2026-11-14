import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — Backend Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const tags = ["Python", "FastAPI", "PostgreSQL", "Apache Spark", "Apache Iceberg"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0d0e12",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(124,132,255,0.22), transparent 45%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          color: "#f1f1f4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.14)",
              alignItems: "center",
              justifyContent: "center",
              color: "#a3abff",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            MA
          </div>
          <div style={{ fontSize: 24, color: "#a1a1aa" }}>Portfolio</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 34, color: "#c4c4cc", marginTop: 12 }}>Backend Engineer · Python · FastAPI · REST APIs</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {tags.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "8px 16px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: 22,
                color: "#d4d4d8",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
