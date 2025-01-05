"use client";

import { useState, useEffect } from "react";
import GlobalStyle from "../styles/globalStyles";
import ClientThemeProvider from "./ClientThemeProvider";

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true); // 글로벌 스타일 적용 완료
    }, 500); // 500ms 후 로딩 상태 해제 (필요에 따라 조정)

    return () => clearTimeout(timeout); // 컴포넌트 언마운트 시 클린업
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
