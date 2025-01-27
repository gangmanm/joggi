"use client";
import { useState, useRef, useEffect } from "react";
import * as S from "../../../styles/vote/vote";
import {
  handleAddImages,
  addVote,
  getVotes,
} from "../../../actions/budget-actions";
import { Database } from "../../../src/types/supabase";
import { useSessionContext } from "../context/SessionContext";
export type VoteRow = Database["public"]["Tables"]["vote"]["Row"];
import VoteList from "../../../components/vote/VoteList";
import Image from "next/image";
import Menu from "../../../components/Menu";
import { useRouter } from "next/navigation"; // app 라우터에서는 next/navigation 사용

export default function Vote() {
  const [file, setFile] = useState<File | null>(null); // 단일 파일 상태
  const [preview, setPreview] = useState<string | null>(null); // 이미지 미리보기 상태
  const [votes, setVotes] = useState<VoteRow[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { session } = useSessionContext();
  const userId = session?.user.id;
  const user_fullname =
    session?.user?.identities?.[0]?.identity_data?.full_name;
  const user_image = session?.user?.identities?.[0]?.identity_data?.avatar_url;
  const router = useRouter(); // useRouter 대신 next/navigation의 useRouter 사용

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

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedVotes = await getVotes();
        setVotes(fetchedVotes.reverse());
        console.log(fetchedVotes);
      } catch (err) {
        console.error("Failed to fetch votes:", err);
      }
    };

    if (userId) {
      fetchTags();
    }
  }, [userId]);

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null; // 첫 번째 파일만 선택
    if (selectedFile) {
      // 파일 타입이 이미지인지 확인
      if (!selectedFile.type.startsWith("image/")) {
        alert("이미지 파일만 업로드할 수 있습니다.");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // 이미지 미리보기 URL 생성
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  // 파일 업로드 핸들러
  const uploadFile = () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    // 파일 업로드 로직 (여기에서 API 호출 가능)
    const imageurl = handleAddImages(file);
    console.log("업로드할 파일:", file);

    alert(`"${file.name}" 파일이 업로드되었습니다.`);
    setFile(null); // 파일 초기화
    setPreview(null); // 미리보기 초기화
    return imageurl;
  };

  const onClickAddVote = async () => {
    try {
      const imageurl = await uploadFile(); // 비동기 처리
      console.log("imageurl", imageurl);
      addVote({
        created_at: new Date().toISOString(),
        image: imageurl || "",
        user_id: userId || "",
        price,
        title,
        content,
        user_image,
        user_name: user_fullname,
      });

      const fetchedVotes = await getVotes();
      if (fetchedVotes.length > 0) {
        setVotes(fetchedVotes.reverse());
      }
    } catch (error) {
      console.error("Error while adding vote:", error);
    }
  };

  return (
    <S.MainContainer>
      <Menu />
      <S.HeaderContainer>
        <S.MenuText onClick={handleRouteToFriends}>친구 목록 보기</S.MenuText>
        <S.MenuText>내가 쓴 글 보기</S.MenuText>
        <S.MenuText>전체 글 보기</S.MenuText>
        <S.MenuText>글 추가하기 +</S.MenuText>
      </S.HeaderContainer>
      <S.VoteContainer>
        <S.VoteHeader>
          <S.VoteHeaderLeft>
            <S.ProfileImageContainer>
              <Image
                src={
                  session?.user?.identities?.[0]?.identity_data?.avatar_url ||
                  ""
                }
                alt="프로필 아이콘"
                fill
                style={{ objectFit: "contain" }}
              />
            </S.ProfileImageContainer>
            {user_fullname}
          </S.VoteHeaderLeft>
          <S.VoteHeaderRight></S.VoteHeaderRight>
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
            ></S.VoteTitleInput>
            <S.VotePriceInput
              placeholder="금액"
              value={price}
              onChange={handleChangePrice}
            ></S.VotePriceInput>
            <S.VoteSubtitleInput
              maxLength={100}
              placeholder="내용을 입력하세요"
              value={content}
              onChange={handleChangeContent}
            ></S.VoteSubtitleInput>
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
