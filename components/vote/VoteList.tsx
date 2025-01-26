"use client";
import { useState, useEffect } from "react";
import { Database } from "../../src/types/supabase";
import { useSessionContext } from "../../src/app/context/SessionContext";
export type VoteRow = Database["public"]["Tables"]["vote"]["Row"];
import { getVotes } from "../../actions/budget-actions";
import * as S from "../../styles/vote/vote";
import Image from "next/image";
export default function VoteList() {
  const { session } = useSessionContext();
  const [votes, setVotes] = useState<VoteRow[]>([]);
  const userId = session?.user;
  console.log(userId);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedVotes = await getVotes();
        setVotes(fetchedVotes);
        console.log(fetchedVotes);
      } catch (err) {
        console.error("Failed to fetch votes:", err);
      }
    };

    if (userId) {
      fetchTags();
    }
  }, [userId]);

  return (
    <>
      {votes.map((vote) => (
        <S.VoteContainer key={vote.id}>
          <S.VoteHeader>
            <S.VoteHeaderLeft>
              <S.ProfileImageContainer></S.ProfileImageContainer>
            </S.VoteHeaderLeft>
            <S.VoteHeaderRight></S.VoteHeaderRight>
          </S.VoteHeader>
          <S.VoteMain>
            <S.ImageContainer>
              <S.ImagePreview>
                <img
                  src={vote.image || ""}
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
              <S.VoteTitleInput placeholder="제목을 입력하세요"></S.VoteTitleInput>
              <S.VotePriceInput placeholder="금액"></S.VotePriceInput>
              <S.VoteSubtitleInput
                maxLength={100}
                placeholder="내용을 입력하세요"
              ></S.VoteSubtitleInput>
            </S.VoteMainLeft>
          </S.VoteMain>

          <S.VoteFooter>
            <S.VoteFooterLeft>
              <S.ImageInput></S.ImageInput>
              <S.UploadButton htmlFor="file-upload">이미지 선택</S.UploadButton>
            </S.VoteFooterLeft>
            <S.VoteFooterRight></S.VoteFooterRight>
          </S.VoteFooter>
        </S.VoteContainer>
      ))}
    </>
  );
}
