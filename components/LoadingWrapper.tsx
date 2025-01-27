"use client";

import { useState, useEffect } from "react";
import GlobalStyle from "../styles/globalStyles";
import ClientThemeProvider from "./ClientThemeProvider";

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // 로딩 상태 관리
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // React가 클라이언트에서 완전히 마운트된 후 상태 변경
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* CSS 기반 로딩 스피너 */}
        <div className="spinner"></div>

        {/* 스피너 스타일 */}
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

  return (
    <ClientThemeProvider>
      <GlobalStyle />
      {children}
    </ClientThemeProvider>
  );
}
