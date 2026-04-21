export default function GlobalLoading() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      gap: 32,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient orbs */}
      <div style={{
        position: "absolute", width: 400, height: 400,
        background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
        top: "15%", left: "10%", borderRadius: "50%", filter: "blur(70px)",
        animation: "pulse 5s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", width: 300, height: 300,
        background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
        bottom: "15%", right: "10%", borderRadius: "50%", filter: "blur(50px)",
        animation: "pulse 4s ease-in-out infinite reverse",
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        @keyframes pulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes spinReverse { to{transform:rotate(-360deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmerText {
          0%{background-position:-200% center}
          100%{background-position:200% center}
        }
        @keyframes dot { 0%,80%,100%{opacity:0;transform:scale(0.5)} 40%{opacity:1;transform:scale(1)} }
        .loading-card { animation: fadeIn 0.5s ease forwards; }
        .loading-word {
          background: linear-gradient(120deg, #c4b5fd, #6366f1, #a855f7, #c4b5fd);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 2.5s linear infinite;
        }
        .dot1 { animation: dot 1.4s infinite ease-in-out; }
        .dot2 { animation: dot 1.4s infinite ease-in-out 0.2s; }
        .dot3 { animation: dot 1.4s infinite ease-in-out 0.4s; }
      `}</style>

      {/* Spinner rings */}
      <div style={{ position: "relative", width: 90, height: 90 }}>
        {/* Outer ring */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "3px solid transparent",
          borderTopColor: "#6366f1", borderRightColor: "#8b5cf6",
          animation: "spin 1.1s linear infinite",
        }} />
        {/* Middle ring */}
        <div style={{
          position: "absolute", inset: 10, borderRadius: "50%",
          border: "3px solid transparent",
          borderTopColor: "#a855f7", borderLeftColor: "#ec4899",
          animation: "spinReverse 0.9s linear infinite",
        }} />
        {/* Inner glow */}
        <div style={{
          position: "absolute", inset: 22, borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.3))",
          boxShadow: "0 0 20px rgba(99,102,241,0.5)",
          animation: "pulse 2s ease-in-out infinite",
        }} />
      </div>

      {/* Text */}
      <div className="loading-card" style={{ textAlign: "center" }}>
        <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
          <span className="loading-word">Loading</span>
          <span className="dot1" style={{ color: "#a855f7", fontSize: 20, fontWeight: 700 }}>.</span>
          <span className="dot2" style={{ color: "#8b5cf6", fontSize: 20, fontWeight: 700 }}>.</span>
          <span className="dot3" style={{ color: "#6366f1", fontSize: 20, fontWeight: 700 }}>.</span>
        </p>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, letterSpacing: 1 }}>
          Please wait a moment
        </p>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 220, height: 3, background: "rgba(255,255,255,0.08)",
        borderRadius: 100, overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(to right, #6366f1, #a855f7, #ec4899)",
          borderRadius: 100,
          animation: "progressBar 1.8s ease-in-out infinite",
          backgroundSize: "200% 100%",
        }} />
        <style>{`
          @keyframes progressBar {
            0%{width:0%;margin-left:0}
            50%{width:70%;margin-left:0}
            100%{width:0%;margin-left:100%}
          }
        `}</style>
      </div>
    </div>
  );
}
