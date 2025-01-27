"use client";
import { Database } from "../../src/types/supabase";
import { useSessionContext } from "../../src/app/context/SessionContext";
import * as S from "../../styles/vote/comment";
import {
  addComment,
  CommentRow,
  deleteComment,
  getComment,
} from "../../actions/budget-actions";
import { useEffect, useState } from "react";
import Image from "next/image";

export type VoteRow = Database["public"]["Tables"]["vote"]["Row"];

interface VoteListProps {
  vote_uuid: string;
}

export default function Comment({ vote_uuid }: VoteListProps) {
  const { session } = useSessionContext();
  const userId = session?.user?.id;
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [commentContent, setCommentContent] = useState("");

  const user_fullname =
    session?.user?.identities?.[0]?.identity_data?.full_name || "";
  const user_image =
    session?.user?.identities?.[0]?.identity_data?.avatar_url || "";

  useEffect(() => {
    const fetchComments = async () => {
      if (!vote_uuid) return;

      try {
        const fetchedComments = await getComment(vote_uuid);
        setComments(fetchedComments.reverse());
      } catch (err) {
        console.error("Failed to fetch comments:", err);
        alert("댓글 목록을 불러오는 데 실패했습니다.");
      }
    };

    fetchComments();
  }, [vote_uuid]);

  const handleChangeCommentContent = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommentContent(event.target.value);
  };

  const onClickAddComment = async () => {
    if (!commentContent.trim()) {
      alert("댓글 내용을 입력하세요.");
      return;
    }

    try {
      await addComment({
        created_at: new Date().toISOString(),
        user_id: userId,
        user_image,
        user_fullname,
        comment: commentContent,
        vote_uuid,
      });

      setCommentContent(""); // 댓글 입력란 초기화
      alert("댓글이 추가되었습니다.");

      // 댓글 목록 갱신
      const updatedComments = await getComment(vote_uuid);
      setComments(updatedComments.reverse());
    } catch (error) {
      console.error("Error while adding comment:", error);
      alert("댓글 추가 중 오류 발생");
    }
  };

  const onClickDelete = async (comment_id: string) => {
    if (!window.confirm("정말로 댓글을 삭제하시겠습니까?")) return;

    try {
      await deleteComment(comment_id);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== comment_id)
      );
      alert("댓글이 삭제되었습니다.");
    } catch (err) {
      console.error("댓글 삭제 중 오류 발생:", err);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <S.CommentContainer>
      <S.CommentInputContainer>
        <S.CommentInput
          placeholder="댓글 작성하기"
          value={commentContent}
          onChange={handleChangeCommentContent}
        />
        <S.AddButton onClick={onClickAddComment}>+</S.AddButton>
      </S.CommentInputContainer>
      {comments.map((comment) => (
        <S.CommentInputContainer key={comment.id}>
          <S.ProfileImageContainer>
            <Image
              src={comment.user_image || ""}
              alt="프로필 아이콘"
              fill
              style={{ objectFit: "fill" }}
            />
          </S.ProfileImageContainer>
          <S.CommentContent>{comment.comment}</S.CommentContent>
          {comment.user_id === userId && (
            <S.AddButton onClick={() => onClickDelete(comment.id)}>
              -
            </S.AddButton>
          )}
        </S.CommentInputContainer>
      ))}
    </S.CommentContainer>
  );
}
