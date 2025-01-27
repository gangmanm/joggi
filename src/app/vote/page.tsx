"use client";
import { useState, useRef, useEffect } from "react";
import * as S from "../../../styles/vote/vote";
import {
  handleAddImages,
  addVote,
  getVotes,
  getFriends,
} from "../../../actions/budget-actions";
import { Database } from "../../../src/types/supabase";
import { useSessionContext } from "../context/SessionContext";
export type VoteRow = Database["public"]["Tables"]["vote"]["Row"];
import VoteList from "../../../components/vote/VoteList";
import Image from "next/image";
import Menu from "../../../components/Menu";
import { useRouter } from "next/navigation";
import LoadingWrapper from "../../../components/LoadingWrapper";
export default function Vote() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [votes, setVotes] = useState<VoteRow[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const limit = 2;
  const [page, setPage] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const { session } = useSessionContext();
  const userId = session?.user?.id || "";
  const user_fullname =
    session?.user?.identities?.[0]?.identity_data?.full_name || "";
  const user_image =
    session?.user?.identities?.[0]?.identity_data?.avatar_url || "";
  const router = useRouter();
  const [userlist, setUserList] = useState<string[]>([]);

  // 세션 로딩 확인 후 친구 목록 불러오기
  useEffect(() => {
    const fetchFriendsAndVotes = async () => {
      if (session && session.user && session.user.id) {
        await onClickWithFriends();
      }
    };
    fetchFriendsAndVotes();
  }, [session]);

  // 상태 변경 후 투표 목록 업데이트
  useEffect(() => {
    const fetchVotes = async () => {
      if (userlist.length > 0) {
        setPage(0); // 페이지 초기화
        setVotes([]); // 기존 투표 목록 초기화
        setHasMore(true); // 데이터 로드 가능 상태로 변경
        await getVoteList(0); // 첫 페이지 로드
      }
    };

    fetchVotes();
  }, [userlist]);

  const handleRouteToFriends = () => {
    router.push("/friends");
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onClickOnlyUser = () => {
    setUserList([userId]);
  };

  const onClickWithFriends = async () => {
    if (!userId) return;

    try {
      const fetchedFriends = await getFriends(userId);
      const friendIds: string[] = fetchedFriends
        .map((friend) => friend.friend_id)
        .filter((id): id is string => id !== null);

      friendIds.push(userId);
      setUserList(friendIds);
    } catch (err) {
      console.error("Failed to fetch votes:", err);
    }
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    // 파일 확장자 검사 (HEIC 포맷인지 확인)
    const isHEIC = file.type === "image/heic" || file.type === "image/heif";

    // Safari 브라우저 감지 (User-Agent 기반)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (!isHEIC) {
      // HEIC가 아닌 경우 변환 없이 바로 미리보기 설정
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setFile(file);
      console.log("HEIC가 아닌 파일을 직접 미리보기로 표시");
      return;
    }

    if (isSafari) {
      // Safari에서는 HEIC를 직접 미리보기 표시
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setFile(file);
      console.log("Safari에서는 HEIC 변환 없이 미리보기 표시");
      return;
    }

    // HEIC 파일 변환 로직
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/convert-heic", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }

      const blob = await response.blob();
      const previewUrl = URL.createObjectURL(blob);

      // Blob을 File 객체로 변환
      const jpgFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      setPreview(previewUrl); // 변환된 이미지 미리보기
      setFile(jpgFile); // JPG 파일로 저장
      console.log("HEIC 파일을 JPG로 변환하여 표시");
    } catch (error) {
      console.error("파일 업로드 및 변환 실패:", error);
    }
  };

  const getVoteList = async (pageNumber: number) => {
    if (!hasMore || loading) return; // 중복 호출 방지
    setLoading(true);

    try {
      const fetchedVotes = await getVotes(userlist, pageNumber, limit);

      if (fetchedVotes.length < limit) {
        setHasMore(false); // 더 이상 불러올 데이터가 없음
      }

      // 중복 방지를 위한 필터링 로직 추가
      setVotes((prevVotes) => {
        const uniqueVotes = fetchedVotes.filter(
          (newVote) => !prevVotes.some((vote) => vote.uuid === newVote.uuid)
        );
        return [...prevVotes, ...uniqueVotes];
      });

      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("투표 목록 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 무한 스크롤 이벤트 핸들러
  const lastVoteElementRef = (node: HTMLElement | null) => {
    if (loading || !hasMore) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getVoteList(page);
      }
    });

    if (node) observer.current.observe(node);
  };

  const uploadFile = async () => {
    if (!file || !title || !price || !content) {
      alert("이미지, 제목,금액,내용을 모두 입력하세요");
      return;
    }

    const imageurl = await handleAddImages(file);
    setFile(null);
    setPreview(null);
    return imageurl;
  };

  const onClickAddVote = async () => {
    try {
      const imageurl = await uploadFile();
      if (!imageurl) {
        return;
      }

      const newVote: VoteRow = {
        id: 0, // 기본값으로 0 또는 적절한 값 설정 (DB에서 자동 생성되는 경우 임시값)
        uuid: crypto.randomUUID(), // 고유 ID 생성
        created_at: new Date().toISOString(),
        image: imageurl || null, // null 허용 타입이므로 적용
        user_id: userId || null, // null 허용
        price: price || null, // 빈 문자열 방지
        title: title || null,
        content: content || null,
        user_image: user_image || null,
        user_name: user_fullname || null,
        like: 0, // 좋아요 기본값 설정
        dislike: 0, // 싫어요 기본값 설정
      };

      // 서버에 투표 추가 요청
      await addVote(newVote);

      // 새로운 투표를 현재 목록의 최상단에 추가
      setVotes((prevVotes) => [newVote, ...prevVotes]);

      // 입력값 초기화
      setTitle("");
      setPrice("");
      setContent("");
      setPreview(null);
    } catch (error) {
      console.error("Error while adding vote:", error);
    }
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    const formattedValue = Number(rawValue).toLocaleString(); // 숫자 형식으로 변환

    setPrice(formattedValue);
  };

  return (
    <LoadingWrapper>
      <S.MainContainer>
        <Menu />
        <S.HeaderContainer>
          <S.MenuText onClick={handleRouteToFriends}>친구 목록 보기</S.MenuText>
          <S.MenuText onClick={onClickOnlyUser}>내가 쓴 글 보기</S.MenuText>
          <S.MenuText onClick={onClickWithFriends}>전체 글 보기</S.MenuText>
        </S.HeaderContainer>
        <S.VoteContainer>
          <S.VoteHeader>
            <S.VoteHeaderLeft>
              <S.ProfileImageContainer>
                {user_image && (
                  <Image
                    src={user_image || ""}
                    alt="프로필 아이콘"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                )}
              </S.ProfileImageContainer>
              {user_fullname}
            </S.VoteHeaderLeft>
          </S.VoteHeader>
          <S.VoteMain>
            <S.ImageContainer>
              <S.ImagePreview>
                {!preview ? (
                  <label htmlFor="file-upload">이미지 추가하기</label>
                ) : (
                  <img
                    src={preview}
                    alt="미리보기"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      border: "1px solid #ccc",
                      borderRadius: "12px",
                    }}
                  />
                )}
              </S.ImagePreview>
            </S.ImageContainer>

            <S.VoteMainLeft>
              <S.VoteTitleInput
                placeholder="제목을 입력하세요"
                value={title}
                maxLength={14}
                onChange={handleChangeTitle}
              />
              <S.VotePriceInput
                placeholder="금액"
                value={price}
                onChange={handleChangePrice}
              />
              <S.VoteSubtitleInput
                maxLength={50}
                placeholder="내용을 입력하세요"
                value={content}
                onChange={handleChangeContent}
              />
            </S.VoteMainLeft>
          </S.VoteMain>

          <S.VoteFooter>
            <S.VoteFooterLeft>
              <S.ImageInput>
                <S.HiddenInput
                  ref={inputRef}
                  type="file"
                  accept="image/*,.heic,.heif"
                  id="file-upload"
                  onChange={handleFileChange}
                />
              </S.ImageInput>

              {preview && (
                <S.UploadButton htmlFor="file-upload">
                  이미지 편집하기
                </S.UploadButton>
              )}
            </S.VoteFooterLeft>
            <S.VoteFooterRight>
              <S.UploadButton onClick={onClickAddVote}>
                투표 추가하기
              </S.UploadButton>
            </S.VoteFooterRight>
          </S.VoteFooter>
        </S.VoteContainer>
        <VoteList
          originalVotes={votes}
          lastVoteElementRefAction={lastVoteElementRef}
        />
      </S.MainContainer>
    </LoadingWrapper>
  );
}
