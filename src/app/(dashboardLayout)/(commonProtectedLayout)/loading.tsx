export default function CommonProtectedDashboardLoading() {
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
        .cp-skeleton { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      <div className="cp-skeleton">
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ ...skeletonStyle, width: 200, height: 28, marginBottom: 10 }} />
          <div style={{ ...skeletonStyle, width: 300, height: 16 }} />
        </div>

        {/* Profile + info block */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20, padding: 28, marginBottom: 24,
          display: "flex", gap: 24, alignItems: "center",
        }}>
          <div style={{ ...skeletonStyle, width: 72, height: 72, borderRadius: "50%", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ ...skeletonStyle, width: "45%", height: 20, marginBottom: 10, borderRadius: 6 }} />
            <div style={{ ...skeletonStyle, width: "30%", height: 14, marginBottom: 8, borderRadius: 6 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ ...skeletonStyle, width: 80, height: 28, borderRadius: 20 }} />
              <div style={{ ...skeletonStyle, width: 80, height: 28, borderRadius: 20 }} />
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: 24,
            }}>
              <div style={{ ...skeletonStyle, width: 130, height: 16, marginBottom: 20 }} />
              {[1, 2, 3].map((j) => (
                <div key={j} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                  <div style={{ ...skeletonStyle, width: 44, height: 44, borderRadius: 10, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ ...skeletonStyle, width: "75%", height: 13, marginBottom: 7, borderRadius: 6 }} />
                    <div style={{ ...skeletonStyle, width: "45%", height: 11, borderRadius: 6 }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
