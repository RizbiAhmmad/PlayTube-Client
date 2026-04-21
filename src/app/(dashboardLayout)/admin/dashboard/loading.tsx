export default function AdminDashboardLoading() {
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .admin-skeleton { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      <div className="admin-skeleton">
        {/* Header skeleton */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ ...skeletonStyle, width: 220, height: 28, marginBottom: 10 }} />
          <div style={{ ...skeletonStyle, width: 340, height: 16 }} />
        </div>

        {/* KPI cards row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 32 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: 24,
            }}>
              <div style={{ ...skeletonStyle, width: 40, height: 40, borderRadius: 10, marginBottom: 16 }} />
              <div style={{ ...skeletonStyle, width: "70%", height: 14, marginBottom: 10 }} />
              <div style={{ ...skeletonStyle, width: "50%", height: 26 }} />
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 32 }}>
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, padding: 24,
          }}>
            <div style={{ ...skeletonStyle, width: 160, height: 18, marginBottom: 20 }} />
            <div style={{ ...skeletonStyle, width: "100%", height: 180, borderRadius: 12 }} />
          </div>
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, padding: 24,
          }}>
            <div style={{ ...skeletonStyle, width: 120, height: 18, marginBottom: 20 }} />
            <div style={{ ...skeletonStyle, width: "100%", height: 180, borderRadius: 12 }} />
          </div>
        </div>

        {/* Table-like skeleton */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16, padding: 24,
        }}>
          <div style={{ ...skeletonStyle, width: 180, height: 18, marginBottom: 20 }} />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
              <div style={{ ...skeletonStyle, width: 36, height: 36, borderRadius: "50%", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ ...skeletonStyle, width: "60%", height: 13, marginBottom: 7, borderRadius: 6 }} />
                <div style={{ ...skeletonStyle, width: "35%", height: 11, borderRadius: 6 }} />
              </div>
              <div style={{ ...skeletonStyle, width: 70, height: 28, borderRadius: 8 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
