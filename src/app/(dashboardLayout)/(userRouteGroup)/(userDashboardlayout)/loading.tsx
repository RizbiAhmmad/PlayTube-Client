export default function UserDashboardLoading() {
  const skeletonStyle = {
    background: "linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.6s infinite",
    borderRadius: 8,
  };

  return (
    <div style={{
      padding: "32px",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      minHeight: "100vh",
    }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .ud-skeleton { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      <div className="ud-skeleton">
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ ...skeletonStyle, width: 240, height: 28, marginBottom: 10 }} />
          <div style={{ ...skeletonStyle, width: 320, height: 16 }} />
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 28 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14, padding: 20, textAlign: "center",
            }}>
              <div style={{ ...skeletonStyle, width: 44, height: 44, borderRadius: "50%", margin: "0 auto 12px" }} />
              <div style={{ ...skeletonStyle, width: "60%", height: 13, margin: "0 auto 8px", borderRadius: 6 }} />
              <div style={{ ...skeletonStyle, width: "40%", height: 22, margin: "0 auto", borderRadius: 6 }} />
            </div>
          ))}
        </div>

        {/* Section label */}
        <div style={{ ...skeletonStyle, width: 160, height: 18, marginBottom: 16 }} />

        {/* Media card grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 18 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14, overflow: "hidden",
            }}>
              {/* Thumbnail */}
              <div style={{ ...skeletonStyle, width: "100%", paddingTop: "56.25%", borderRadius: 0 }} />
              {/* Info */}
              <div style={{ padding: 14 }}>
                <div style={{ ...skeletonStyle, width: "85%", height: 14, marginBottom: 8, borderRadius: 6 }} />
                <div style={{ ...skeletonStyle, width: "55%", height: 12, marginBottom: 12, borderRadius: 6 }} />
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ ...skeletonStyle, width: 60, height: 24, borderRadius: 20 }} />
                  <div style={{ ...skeletonStyle, width: 50, height: 24, borderRadius: 20 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
