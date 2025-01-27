"use client";
import * as S from "../../../styles/friends/friends";
import Menu from "../../../components/Menu";
import { useSessionContext } from "../context/SessionContext";
import { useEffect, useState } from "react";
import { getFriends } from "../../../actions/budget-actions";
import { FriendRow } from "../../../actions/budget-actions";
export default function Vote() {
  const { session } = useSessionContext();
  const [friends, setFriends] = useState<FriendRow[]>([]);
  const userId = session?.user.id;

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedFriends = await getFriends(session?.user.id || "");
        setFriends(fetchedFriends.reverse());
      } catch (err) {
        console.error("Failed to fetch votes:", err);
      }
    };
    if (userId) {
      fetchTags();
    }
  }, [userId]);

  return (
    <S.MainContainer>
      {" "}
      <Menu />
      <S.HeaderContainer>
        <S.MenuText>내가 쓴 글 보기</S.MenuText>
        <S.MenuText>전체 글 보기</S.MenuText>
        <S.MenuText>글 추가하기 +</S.MenuText>
      </S.HeaderContainer>
      <S.FriendInputContainer>
        <S.FriendInput></S.FriendInput>
        <S.AddButton>+</S.AddButton>
      </S.FriendInputContainer>
    </S.MainContainer>
  );
}
