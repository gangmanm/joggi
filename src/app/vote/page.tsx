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

export default function Vote() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [votes, setVotes] = useState<VoteRow[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
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
    if (userlist.length > 0) {
      getVoteList();
    }
  }, [userlist]);

  const handleRouteToFriends = () => {
    router.push("/friends");
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
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

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        alert("이미지 파일만 업로드할 수 있습니다.");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const getVoteList = async () => {
    try {
      const fetchedVotes = await getVotes(userlist);
      setVotes(fetchedVotes.reverse());
    } catch {
      console.log("투표 목록 불러오기 실패");
    }
  };

  // 파일 업로드 핸들러
  const uploadFile = async () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return "";
    }

    const imageurl = await handleAddImages(file);
    console.log("업로드할 파일:", file);

    alert(`"${file.name}" 파일이 업로드되었습니다.`);
    setFile(null);
    setPreview(null);
    return imageurl;
  };

  const onClickAddVote = async () => {
    try {
      const imageurl = await uploadFile();

      await addVote({
        created_at: new Date().toISOString(),
        image: imageurl || "",
        user_id: userId,
        price,
        title,
        content,
        user_image,
        user_name: user_fullname,
      });

      getVoteList();
    } catch (error) {
      console.error("Error while adding vote:", error);
    }
  };

  return (
    <S.MainContainer>
      <Menu />
      <S.HeaderContainer>
        <S.MenuText onClick={handleRouteToFriends}>친구 목록 보기</S.MenuText>
        <S.MenuText onClick={onClickOnlyUser}>내가 쓴 글 보기</S.MenuText>
        <S.MenuText onClick={onClickWithFriends}>전체 글 보기</S.MenuText>
        <S.MenuText onClick={onClickAddVote}>글 추가하기 +</S.MenuText>
      </S.HeaderContainer>
      <S.VoteContainer>
        <S.VoteHeader>
          <S.VoteHeaderLeft>
            <S.ProfileImageContainer>
              <Image
                src={user_image || ""}
                alt="프로필 아이콘"
                fill
                style={{ objectFit: "contain" }}
              />
            </S.ProfileImageContainer>
            {user_fullname}
          </S.VoteHeaderLeft>
        </S.VoteHeader>
        <S.VoteMain>
          <S.ImageContainer>
            <S.ImagePreview>
              {preview && (
                <img
                  src={preview}
                  alt="미리보기"
                  style={{
                    maxWidth: "100%",
                    height: "100%",
                    border: "1px solid #ccc",
                  }}
                />
              )}
            </S.ImagePreview>
          </S.ImageContainer>
          <S.VoteMainLeft>
            <S.VoteTitleInput
              placeholder="제목을 입력하세요"
              value={title}
              onChange={handleChangeTitle}
            />
            <S.VotePriceInput
              placeholder="금액"
              value={price}
              onChange={handleChangePrice}
            />
            <S.VoteSubtitleInput
              maxLength={100}
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
                accept="image/*"
                id="file-upload"
                onChange={handleFileChange}
              />
            </S.ImageInput>
            <S.UploadButton htmlFor="file-upload">이미지 선택</S.UploadButton>
          </S.VoteFooterLeft>
          <S.VoteFooterRight>
            <S.UploadButton onClick={onClickAddVote}>
              투표 추가하기
            </S.UploadButton>
          </S.VoteFooterRight>
        </S.VoteFooter>
      </S.VoteContainer>
      <VoteList originalVotes={votes} />
    </S.MainContainer>
  );
}
