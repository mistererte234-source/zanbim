import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ZanBimbel v3 — Enterprise Adaptive Learning & Assessment AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#09090B",
          padding: "60px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background Glow Orbs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(9, 9, 11, 0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(9, 9, 11, 0) 70%)",
          }}
        />

        {/* Top Header Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 24px",
            borderRadius: "9999px",
            backgroundColor: "rgba(39, 39, 42, 0.7)",
            border: "1px solid rgba(99, 102, 241, 0.4)",
            color: "#A5B4FC",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <span>✨ Enterprise Adaptive Learning & Assessment Platform</span>
        </div>

        {/* Center Main Brand & Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "16px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontSize: "72px",
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-2px",
              }}
            >
              ZanBimbel
            </span>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 800,
                padding: "4px 14px",
                borderRadius: "10px",
                backgroundColor: "rgba(99, 102, 241, 0.25)",
                color: "#818CF8",
                border: "1px solid rgba(99, 102, 241, 0.5)",
              }}
            >
              v3.0
            </span>
          </div>

          <p
            style={{
              fontSize: "26px",
              color: "#A1A1AA",
              maxWidth: "850px",
              lineHeight: "1.4",
              margin: 0,
            }}
          >
            Bukan Bank Soal Biasa. AI yang Mengukur Gap Kemampuan & Memberikan Latihan Terfokus.
          </p>
        </div>

        {/* 5 Track Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            width: "100%",
            zIndex: 10,
          }}
        >
          {[
            { label: "🎓 UTBK SNBT", color: "#818CF8" },
            { label: "🏛️ CPNS SKD", color: "#22D3EE" },
            { label: "💼 REKRUTMEN HRD", color: "#34D399" },
            { label: "🏛️ DEWAN RI", color: "#FBBF24" },
            { label: "🎓 DOSEN PTN/PTS", color: "#C084FC" },
          ].map((track, i) => (
            <div
              key={i}
              style={{
                padding: "10px 18px",
                borderRadius: "14px",
                backgroundColor: "rgba(24, 24, 27, 0.85)",
                border: `1px solid rgba(255, 255, 255, 0.12)`,
                color: track.color,
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {track.label}
            </div>
          ))}
        </div>

        {/* Footer Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(39, 39, 42, 0.8)",
            paddingTop: "20px",
            fontSize: "16px",
            color: "#71717A",
            zIndex: 10,
          }}
        >
          <span>Powered by Adaptive AI Engine</span>
          <span style={{ color: "#E4E4E7", fontWeight: "bold" }}>zandev.id</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
