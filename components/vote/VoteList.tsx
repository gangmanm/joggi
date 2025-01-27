"use client";
import { useState, useEffect } from "react";
import { Database } from "../../src/types/supabase";
import { useSessionContext } from "../../src/app/context/SessionContext";
import { deleteVote, addLike, getLike } from "../../actions/budget-actions";
import Image from "next/image";
import * as S from "../../styles/vote/vote";
import Comment from "./Comment";

export type VoteRow = Database["public"]["Tables"]["vote"]["Row"];

interface VoteListProps {
  originalVotes: VoteRow[];
  lastVoteElementRefAction: (node: HTMLElement | null) => void;
}

export default function VoteList({
  originalVotes,
  lastVoteElementRefAction,
}: VoteListProps) {
  const { session } = useSessionContext();
  const userId = session?.user?.id;
  const [votes, setVotes] = useState<VoteRow[]>(originalVotes);
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [dislikeCounts, setDislikeCounts] = useState<{ [key: string]: number }>(
    {}
  );
  const [userVoteStatus, setUserVoteStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const [openComments, setOpenComments] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    setVotes(originalVotes);
    originalVotes.forEach((vote) => fetchVoteResult(vote.uuid));
  }, [originalVotes, userId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const fetchVoteResult = async (voteId: string) => {
    try {
      const fetchedLikes = await getLike(voteId);
      const result = fetchedLikes?.reduce(
        (acc, like) => {
          like.like ? acc.likes++ : acc.dislikes++;
          if (like.user_id === userId) acc.userVoted = true;
          return acc;
        },
        { likes: 0, dislikes: 0, userVoted: false }
      );

      setLikeCounts((prev) => ({ ...prev, [voteId]: result?.likes || 0 }));
      setDislikeCounts((prev) => ({
        ...prev,
        [voteId]: result?.dislikes || 0,
      }));
      setUserVoteStatus((prev) => ({
        ...prev,
        [voteId]: result?.userVoted || false,
      }));
    } catch (error) {
      console.error(`투표 ${voteId} 데이터 불러오기 실패:`, error);
    }
  };

  const handleDelete = async (voteId: string) => {
    try {
      const success = await deleteVote(voteId);
      if (success)
        setVotes((prev) => prev.filter((vote) => vote.uuid !== voteId));
      else alert("삭제에 실패했습니다. 다시 시도해 주세요.");
    } catch (err) {
      console.error("삭제 중 오류 발생:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const onClickAddLike = async (like: boolean, voteId: string) => {
    if (!userId) return alert("로그인이 필요합니다.");
    if (userVoteStatus[voteId]) return alert("이미 투표하셨습니다.");

    try {
      await addLike({
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        user_id: userId,
        like,
        vote_id: voteId,
      });
      setLikeCounts((prev) => ({
        ...prev,
        [voteId]: (prev[voteId] || 0) + (like ? 1 : 0),
      }));
      setDislikeCounts((prev) => ({
        ...prev,
        [voteId]: (prev[voteId] || 0) + (!like ? 1 : 0),
      }));
      setUserVoteStatus((prev) => ({ ...prev, [voteId]: true }));
    } catch (error) {
      console.error("좋아요 추가 중 오류 발생:", error);
    }
  };

  const toggleComment = (voteId: string) => {
    setOpenComments((prev) => ({ ...prev, [voteId]: !prev[voteId] }));
  };

  return (
    <>
      {votes.map((vote, index) => (
        <S.VoteContainer
          key={vote.uuid}
          ref={index === votes.length - 1 ? lastVoteElementRefAction : null}
        >
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
            <S.VoteHeaderRight>{formatDate(vote.created_at)}</S.VoteHeaderRight>
          </S.VoteHeader>

          <S.VoteMain>
            <S.ImageContainer>
              <S.ImagePreview>
                <Image
                  src={vote.image || "/placeholder.png"}
                  alt="미리보기"
                  fill
                  style={{
                    border: "1px solid #ccc",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </S.ImagePreview>
            </S.ImageContainer>
            <S.VoteMainLeft>
              <S.VoteTitleInput
                placeholder="제목"
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
                value={vote.content || ""}
                readOnly
              />
              <S.MainLeftBottomContainer>
                <S.LikeContainer>
                  <S.LikeImageContainer>
                    <Image
                      onClick={() => onClickAddLike(true, vote.uuid)}
                      src="/image/like.png"
                      alt="좋아요"
                      fill
                      style={{ objectFit: "contain", cursor: "pointer" }}
                    />
                  </S.LikeImageContainer>
                  <S.LikeAmtContainer>
                    {likeCounts[vote.uuid] || 0}
                  </S.LikeAmtContainer>
                </S.LikeContainer>
                <S.LikeContainer>
                  <S.LikeImageContainer>
                    <Image
                      onClick={() => onClickAddLike(false, vote.uuid)}
                      src="/image/dislike.png"
                      alt="싫어요"
                      fill
                      style={{ objectFit: "contain", cursor: "pointer" }}
                    />
                  </S.LikeImageContainer>
                  <S.LikeAmtContainer>
                    {dislikeCounts[vote.uuid] || 0}
                  </S.LikeAmtContainer>
                </S.LikeContainer>
              </S.MainLeftBottomContainer>
            </S.VoteMainLeft>
          </S.VoteMain>

          <S.VoteFooter>
            <S.UploadButton onClick={() => toggleComment(vote.uuid)}>
              댓글보기
            </S.UploadButton>
            {vote.user_id === userId && (
              <S.UploadButton onClick={() => handleDelete(vote.uuid)}>
                삭제하기
              </S.UploadButton>
            )}
          </S.VoteFooter>
          {openComments[vote.uuid] && <Comment vote_uuid={vote.uuid} />}
        </S.VoteContainer>
      ))}
    </>
  );
}
