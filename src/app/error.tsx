"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background glow orbs */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(239,68,68,0.18) 0%, transparent 70%)",
          top: "10%",
          left: "20%",
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "pulse 4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          bottom: "15%",
          right: "15%",
          borderRadius: "50%",
          filter: "blur(50px)",
          animation: "pulse 5s ease-in-out infinite reverse",
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
        @keyframes pulse { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes glitch {
          0%,100%{text-shadow:0 0 0 transparent}
          10%{text-shadow:-3px 0 #ef4444,3px 0 #a855f7}
          20%{text-shadow:3px 0 #ef4444,-3px 0 #a855f7}
          30%{text-shadow:0 0 0 transparent}
        }
        @keyframes floatIn { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .error-title { animation: glitch 3s ease-in-out infinite, floatIn 0.6s ease forwards; }
        .error-card { animation: floatIn 0.5s ease forwards; }
        .retry-btn:hover { transform:translateY(-2px) scale(1.02); box-shadow:0 12px 36px rgba(239,68,68,0.45) !important; }
        .retry-btn { transition: all 0.25s ease !important; }
        .home-btn:hover { background:rgba(255,255,255,0.15) !important; transform:translateY(-2px); }
        .home-btn { transition: all 0.25s ease !important; }
      `}</style>

      <div
        className="error-card"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: 24,
          padding: "60px 56px",
          maxWidth: 520,
          width: "90%",
          textAlign: "center",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Error icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
            boxShadow: "0 8px 32px rgba(239,68,68,0.4)",
          }}
        >
          <span style={{ fontSize: 36 }}>⚠</span>
        </div>

        {/* Error code */}
        <p
          style={{
            color: "#ef4444",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Runtime Error
        </p>

        {/* Title */}
        <h1
          className="error-title"
          style={{
            color: "#ffffff",
            fontSize: "clamp(28px,5vw,40px)",
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          Something went wrong!
        </h1>

        {/* Description */}
        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 15,
            lineHeight: 1.7,
            marginBottom: 8,
          }}
        >
          An unexpected error occurred while rendering this page.
        </p>

        {error.digest && (
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 12,
              fontFamily: "monospace",
              marginBottom: 0,
              background: "rgba(0,0,0,0.3)",
              padding: "4px 12px",
              borderRadius: 6,
              display: "inline-block",
            }}
          >
            ID: {error.digest}
          </p>
        )}

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.08)",
            margin: "32px 0",
          }}
        />

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            className="retry-btn"
            onClick={() => reset()}
            style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "14px 32px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 6px 24px rgba(239,68,68,0.35)",
            }}
          >
            ↻ Try Again
          </button>
          <Link
            href="/"
            className="home-btn"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12,
              padding: "14px 32px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            🏠 Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
