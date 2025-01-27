"use client";
import { Database } from "../../src/types/supabase";
import { useSessionContext } from "../../src/app/context/SessionContext";
import * as S from "../../styles/vote/comment";

export type VoteRow = Database["public"]["Tables"]["vote"]["Row"];

interface VoteListProps {
  vote_uuid: string;
}

export default function Comment({ vote_uuid }: VoteListProps) {
  const { session } = useSessionContext();
  const userId = session?.user?.id;

  return (
    <S.CommentContainer>
      <S.CommentHeader>댓글</S.CommentHeader>
      <S.CommentInputContainer>
        <S.CommentInput placeholder="댓글 작성하기"></S.CommentInput>
        <S.AddButton>+</S.AddButton>
      </S.CommentInputContainer>
      <S.CommentInputContainer>
        <S.ProfileImageContainer></S.ProfileImageContainer>
      </S.CommentInputContainer>
    </S.CommentContainer>
  );
}
