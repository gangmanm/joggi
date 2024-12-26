"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // 패키지 경로 수정
import React from "react";

// QueryClient 인스턴스 생성
export const queryClient = new QueryClient();

export default function ReactQueryClientProviders({
  children,
}: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
