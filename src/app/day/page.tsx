"use client";
import * as S from "../../../styles/day/day";
import { Header } from "../../../styles/header";
export default function Home() {
  return (
    <S.MainContainer>
      <Header />
      <S.SubContainer>
        <S.TotalMainContainer>
          <S.TotalMainText>
            <S.HeaderText>오늘의 수입</S.HeaderText>
            <S.TotalText>11만 233원</S.TotalText>
          </S.TotalMainText>
          <S.TotalSubContainer></S.TotalSubContainer>
        </S.TotalMainContainer>
      </S.SubContainer>
    </S.MainContainer>
  );
}
