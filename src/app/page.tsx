"use client";

import * as S from "../../styles/main";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getExpense } from "../../actions/todo-actions";
import { ExpenseRow } from "../../actions/todo-actions";

export default function Home() {
  const expenseQuery = useQuery<ExpenseRow[], Error>({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await getExpense();
      console.log("Fetched Data:", response); // 요청 결과 로그 확인
      return response;
    },
  });

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
