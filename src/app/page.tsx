"use client";

import * as S from "../../styles/main";
import Image from "next/image";
import { createClient } from "../../utils/supabase/client";

const supabase = createClient();

export default function Home() {
  // Google 로그인 핸들러
  const handleGoogleLogin = async () => {
    try {
      const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL || "/";
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          redirectTo: redirectUrl, // Google OAuth 성공 후 리디렉션될 URL
        },
      });

      if (error) {
        console.error("로그인 오류:", error.message);
      } else {
        console.log("로그인 성공:", data);
      }
    } catch (error) {
      console.error("예기치 못한 오류:", error);
    }
  };

  return (
    <S.Main>
      <S.ImageContainer>
        <Image
          src="/image/jogi-logo.png"
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
    </S.Main>
  );
}
