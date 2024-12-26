"use client";

import * as S from "../../styles/main";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getExpense } from "../../actions/todo-actions";
import { ExpenseRow } from "../../actions/todo-actions";
import { createClient } from "../../utils/supabase/client"; // Supabase 클라이언트 가져오기
import { useEffect } from "react";

const supabase = createClient();

export default function Home() {
  const expenseQuery = useQuery<ExpenseRow[], Error>({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await getExpense();
      console.log("Fetched Data:", response); // 요청 결과 로그 확인
      return response;
    },
  });

  // Google 로그인 핸들러
  const handleGoogleLogin = async () => {
    const redirectUrl =
      process.env.NODE_ENV === "production"
        ? "https://your-production-domain.com/day" // 배포 환경 URL
        : "http://localhost:3000/day"; // 로컬 개발 URL

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: redirectUrl, // 동적 리디렉션 URL
      },
    });

    if (error) {
      console.error("로그인 오류:", error.message);
    } else {
      console.log("로그인 성공:", data);
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        console.log("사용자가 로그인했습니다:", session);
      } else {
        console.log("사용자가 로그아웃했습니다.");
      }
    });

    // Cleanup the subscription
    return () => subscription.unsubscribe();
  }, []);

  return (
    <S.Main>
      <S.ImageContainer>
        <Image
          src="/image/logo.png"
          alt="로고 아이콘"
          layout="fill"
          objectFit="contain"
        />
      </S.ImageContainer>
      <S.Title>JOGI</S.Title>
      <S.LoginButton onClick={handleGoogleLogin}>
        <S.GoogleImageContainer>
          <Image
            src="/image/google.png"
            alt="구글 로고 아이콘"
            layout="fill"
            objectFit="contain"
          />
        </S.GoogleImageContainer>
        구글로 로그인
      </S.LoginButton>
      <div>
        {expenseQuery.isLoading && <p>Loading...</p>}
        {expenseQuery.isError && <p>Error: {expenseQuery.error.message}</p>}
        {expenseQuery.data &&
          expenseQuery.data.map((expense) => (
            <S.LoginButton key={expense.id}>{expense.name}</S.LoginButton> // JSX 반환 추가
          ))}
      </div>
    </S.Main>
  );
}
