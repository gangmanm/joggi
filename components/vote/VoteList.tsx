"use client";
import { Database } from "../../src/types/supabase";
import { useSessionContext } from "../../src/app/context/SessionContext";
export type VoteRow = Database["public"]["Tables"]["vote"]["Row"];
import * as S from "../../styles/vote/vote";

interface VoteListProps {
  votes: VoteRow[];
}

export default function VoteList({ votes }: VoteListProps) {
  const { session } = useSessionContext();
  const userId = session?.user?.id;

  return (
    <>
      {votes.map((vote) => (
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
            </S.VoteHeaderLeft>
            <S.VoteHeaderRight>
              {vote.user_id === userId ? "내 투표" : "공개 투표"}
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
                maxLength={100}
                placeholder="내용을 입력하세요"
                value={vote.content || ""}
                readOnly
              />
            </S.VoteMainLeft>
          </S.VoteMain>

          <S.VoteFooter>
            <S.VoteFooterLeft>
              <S.ImageInput></S.ImageInput>
              <S.UploadButton htmlFor="file-upload">이미지 선택</S.UploadButton>
            </S.VoteFooterLeft>
            <S.VoteFooterRight>
              <S.UploadButton>투표하기</S.UploadButton>
            </S.VoteFooterRight>
          </S.VoteFooter>
        </S.VoteContainer>
      ))}
    </>
  );
}
