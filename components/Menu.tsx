"use client"; // 클라이언트 컴포넌트 선언

import { useState } from "react";
import { useRouter } from "next/navigation"; // app 라우터에서는 next/navigation 사용
import * as S from "../styles/menu";
import Image from "next/image";

export default function Menu() {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter(); // useRouter 대신 next/navigation의 useRouter 사용

  const handleRouteToMonth = () => {
    router.push("/month"); // "/month"로 라우팅
  };

  return (
    <S.Menu>
      {/* 메뉴 컨테이너 클릭 시 openMenu 상태 변경 */}
      <S.MenuContainer onClick={() => setOpenMenu((prev) => !prev)}>
        <S.MenuImageContainer>
          <Image
            src="/image/menu.png"
            alt="로고 아이콘"
            fill
            style={{ objectFit: "contain" }}
          />
        </S.MenuImageContainer>
      </S.MenuContainer>

      {/* openMenu가 true일 때만 MenuOpen 표시 */}
      {openMenu && (
        <S.MenuOpen>
          <S.SubMenuImageContainer>
            <Image
              src="/image/vote.png"
              alt="투표 메뉴"
              fill
              style={{ objectFit: "contain" }}
            />
          </S.SubMenuImageContainer>
          <S.SubMenuImageContainer>
            <Image
              src="/image/day.png"
              alt="일 메뉴"
              fill
              style={{ objectFit: "contain" }}
            />
          </S.SubMenuImageContainer>
          <S.SubMenuImageContainer onClick={handleRouteToMonth}>
            <Image
              src="/image/month.png"
              alt="월 메뉴"
              fill
              style={{ objectFit: "contain" }}
            />
          </S.SubMenuImageContainer>
        </S.MenuOpen>
      )}
    </S.Menu>
  );
}
