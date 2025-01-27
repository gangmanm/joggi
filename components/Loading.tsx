"use client";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed", // Ensures it's centered relative to the viewport
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        zIndex: 1000, // Ensure it overlays other elements
      }}
    >
      {/* CSS-based spinner */}
      <div className="spinner"></div>

      {/* Spinner styles */}
      <style jsx>{`
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-top: 4px solid #590456;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
