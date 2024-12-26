"use client";
import * as S from "../../styles/main";
import Image from "next/image";

export default function Home() {
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
      <S.LoginButton>
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
