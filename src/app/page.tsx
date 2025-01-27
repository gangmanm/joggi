"use client";

import * as S from "../../styles/main";
import Image from "next/image";
import { createClient } from "../../utils/supabase/client";
import { useEffect } from "react";
import { addUsers, getUsers } from "../../actions/budget-actions";

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

  const handleAuthChange = async () => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        console.log("사용자가 로그인했습니다:", session);

        // 사용자가 이미 존재하는지 확인
        const fetchedData = await getUsers(session.user.id);

        if (!fetchedData) {
          // 유저가 존재하지 않는 경우에만 추가
          await addUsers({
            created_at: new Date().toISOString(),
            user_id: session?.user?.id || "",
            user_fullname:
              session?.user?.identities?.[0]?.identity_data?.full_name || null,
            user_image:
              session?.user?.identities?.[0]?.identity_data?.avatar_url || null,
          });

          console.log("새로운 사용자가 추가되었습니다.");
        } else {
          console.log("사용자가 이미 존재합니다.");
        }
      } else {
        console.log("사용자가 로그아웃했습니다.");
      }
    });

    // Cleanup the subscription when component unmounts
    return () => subscription.unsubscribe();
  };

  useEffect(() => {
    handleAuthChange();
  }, []);

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
