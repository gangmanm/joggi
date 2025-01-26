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
          <S.ImageContainer>
            <S.ImagePreview>
              <img
                src={vote.image || ""}
                alt="미리보기"
                style={{
                  maxWidth: "100%",
                  height: "100%",
                  border: "1px solid #ccc",
                }}
              />
            </S.ImagePreview>
          </S.ImageContainer>
          <S.VoteMainLeft>
            <S.VoteButtonContainer>
              <S.LikeContainer>
                <S.LikeImageContainer>
                  <Image
                    src="/image/like.png"
                    alt="좋아요 버튼"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </S.LikeImageContainer>
                <S.LikeAmtContainer>26</S.LikeAmtContainer>
              </S.LikeContainer>
              <S.LikeContainer>
                <S.LikeImageContainer>
                  <Image
                    src="/image/dislike.png"
                    alt="좋아요 버튼"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </S.LikeImageContainer>
                <S.LikeAmtContainer>26</S.LikeAmtContainer>
              </S.LikeContainer>
            </S.VoteButtonContainer>
          </S.VoteMainLeft>
        </S.VoteContainer>
      ))}
    </>
  );
}
