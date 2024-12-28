"use client";
import { useState } from "react";
import * as S from "../styles/menu";
import Image from "next/image";
export default function Menu() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <S.Menu>
      {/* 메뉴 컨테이너 클릭 시 openMenu 상태 변경 */}
      <S.MenuContainer onClick={() => setOpenMenu((prev) => !prev)}>
        <S.MenuImageContainer>
          <Image
            src="/image/menu.png"
            alt="로고 아이콘"
            layout="fill"
            objectFit="contain"
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
              layout="fill"
              objectFit="contain"
            />
          </S.SubMenuImageContainer>
          <S.SubMenuImageContainer>
            <Image
              src="/image/day.png"
              alt="일 메뉴"
              layout="fill"
              objectFit="contain"
            />
          </S.SubMenuImageContainer>
          <S.SubMenuImageContainer>
            <Image
              src="/image/month.png"
              alt="월 메뉴"
              layout="fill"
              objectFit="contain"
            />
          </S.SubMenuImageContainer>
        </S.MenuOpen>
      )}
    </S.Menu>
  );
}
