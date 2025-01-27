"use client";
import * as S from "../../../styles/friends/friends";
import Menu from "../../../components/Menu";
import { useSessionContext } from "../context/SessionContext";
import { useEffect, useState } from "react";
import {
  getFriends,
  addFriends,
  getUsers,
} from "../../../actions/budget-actions";
import { FriendRow } from "../../../actions/budget-actions";
import Image from "next/image";
import { useRouter } from "next/navigation"; // app 라우터에서는 next/navigation 사용

export default function Vote() {
  const { session } = useSessionContext();
  const [friends, setFriends] = useState<FriendRow[]>([]);
  const [friendId, setFriendId] = useState<string>(""); // 입력 상태 추가
  const userId = session?.user?.id;
  const router = useRouter(); // useRouter 대신 next/navigation의 useRouter 사용

  const handleRouteToVote = () => {
    router.push("/vote");
  };
  useEffect(() => {
    const fetchFriends = async () => {
      if (!userId) return;

      try {
        const fetchedFriends = await getFriends(userId);
        setFriends(fetchedFriends.reverse());
      } catch (err) {
        console.error("Failed to fetch friends:", err);
        alert("친구 목록을 불러오는 데 실패했습니다.");
      }
    };

    fetchFriends();
  }, [userId]);

  const onClickAddFriend = async () => {
    if (!friendId.trim()) {
      alert("친구 ID를 입력하세요.");
      return;
    }

    try {
      const fetchedUser = await getUsers(friendId);

      if (fetchedUser) {
        await addFriends({
          created_at: new Date().toISOString(),
          friend_id: fetchedUser[0].user_id,
          friend_image: fetchedUser[0].user_image,
          friend_fullname: fetchedUser[0].user_fullname,
          user_id: userId,
        });
        alert("친구가 추가되었습니다.");
        setFriendId(""); // 입력 필드 초기화
      } else {
        alert("친구를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Error while adding friend:", error);
      alert("친구 추가 중 오류 발생");
    }
  };

  return (
    <S.MainContainer>
      <Menu />
      <S.HeaderContainer>
        <S.MenuText onClick={handleRouteToVote}>
          글 목록으로 돌아가기
        </S.MenuText>
      </S.HeaderContainer>
      <S.FriendInputContainer>
        <S.FriendInput
          placeholder="친구 ID 입력"
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
        />
        <S.AddButton onClick={onClickAddFriend}>+</S.AddButton>
      </S.FriendInputContainer>
      <div>
        {friends.length > 0 ? (
          friends.map((friend) => (
            <S.FriendContainer key={friend.friend_id}>
              <S.ProfileLeft>
                <S.ProfileImageContainer>
                  <Image
                    src={friend.friend_image || ""}
                    alt="프로필 아이콘"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </S.ProfileImageContainer>
                {friend.friend_fullname}
              </S.ProfileLeft>
              <S.DeleteButton>-</S.DeleteButton>
            </S.FriendContainer>
          ))
        ) : (
          <p>친구 목록이 없습니다.</p>
        )}
      </div>
    </S.MainContainer>
  );
}
