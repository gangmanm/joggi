"use client";
import { Database } from "../../src/types/supabase";
import { useSessionContext } from "../../src/app/context/SessionContext";
export type VoteRow = Database["public"]["Tables"]["vote"]["Row"];
import * as S from "../../styles/vote/vote";
import { deleteVote } from "../../actions/budget-actions";
import { useEffect, useState } from "react";
import Image from "next/image";

interface VoteListProps {
  originalVotes: VoteRow[];
}

export default function VoteList({ originalVotes }: VoteListProps) {
  const { session } = useSessionContext();
  const userId = session?.user?.id;
  const [votes, setVotes] = useState<VoteRow[]>(originalVotes);

  useEffect(() => {
    setVotes(originalVotes);
  }, [originalVotes]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const handleDelete = async (voteId: number) => {
    try {
      const success = await deleteVote(voteId);
      if (success) {
        setVotes((prev) => prev.filter((vote) => vote.id !== voteId));
      } else {
        alert("삭제에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (err) {
      console.error("Failed to delete vote:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      {votes.length > 0 ? (
        votes.map((vote) => (
          <S.VoteContainer key={vote.id}>
            <S.VoteHeader>
              <S.VoteHeaderLeft>
                <S.ProfileImageContainer>
                  <img
                    src={vote.user_image || "/default-avatar.png"}
                    alt="사용자 프로필"
                    style={{
                      maxWidth: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </S.ProfileImageContainer>
                {vote.user_name}
              </S.VoteHeaderLeft>
              <S.VoteHeaderRight>
                {formatDate(vote.created_at)}
              </S.VoteHeaderRight>
            </S.VoteHeader>

            <S.VoteMain>
              <S.ImageContainer>
                <S.ImagePreview>
                  <img
                    src={vote.image || "/placeholder.png"}
                    alt="미리보기"
                    style={{
                      maxWidth: "100%",
                      height: "100%",
                      border: "1px solid #ccc",
                      objectFit: "contain",
                    }}
                  />
                </S.ImagePreview>
              </S.ImageContainer>
              <S.VoteMainLeft>
                <S.VoteTitleInput
                  placeholder="제목을 입력하세요"
                  value={vote.title || ""}
                  readOnly
                />
                <S.VotePriceInput
                  placeholder="금액"
                  value={vote.price || ""}
                  readOnly
                />
                <S.VoteSubtitleInput
                  as="textarea"
                  maxLength={100}
                  placeholder="내용을 입력하세요"
                  value={vote.content || ""}
                  readOnly
                />
                <S.MainLeftBottomContainer>
                  <S.LikeContainer>
                    <S.LikeImageContainer>
                      <Image
                        src="/image/like.png"
                        alt="투표 메뉴"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </S.LikeImageContainer>
                    <S.LikeAmtContainer>0</S.LikeAmtContainer>
                  </S.LikeContainer>
                  <S.LikeContainer>
                    <S.LikeImageContainer>
                      <Image
                        src="/image/like.png"
                        alt="투표 메뉴"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </S.LikeImageContainer>
                    <S.LikeAmtContainer>0</S.LikeAmtContainer>
                  </S.LikeContainer>
                </S.MainLeftBottomContainer>
              </S.VoteMainLeft>
            </S.VoteMain>

            <S.VoteFooter>
              <S.VoteFooterLeft>
                <S.UploadButton htmlFor="file-upload">
                  이미지 선택
                </S.UploadButton>
              </S.VoteFooterLeft>
              <S.VoteFooterRight>
                <S.UploadButton>댓글보기</S.UploadButton>
                {vote.user_id === userId && (
                  <S.UploadButton onClick={() => handleDelete(vote.id)}>
                    삭제하기
                  </S.UploadButton>
                )}
              </S.VoteFooterRight>
            </S.VoteFooter>
          </S.VoteContainer>
        ))
      ) : (
        <div>등록된 투표가 없습니다.</div>
      )}
    </>
  );
}
