"use client";
import { useState, useRef, useEffect } from "react";
import * as S from "../../../styles/vote/vote";
import {
  handleAddImages,
  addVote,
  getVotes,
} from "../../../actions/budget-actions";
import { Database } from "../../../src/types/supabase";
import { Session } from "@supabase/supabase-js";
export type VoteRow = Database["public"]["Tables"]["vote"]["Row"];
import VoteList from "../../../components/vote/VoteList";
import Image from "next/image";

export default function Vote() {
  const [file, setFile] = useState<File | null>(null); // 단일 파일 상태
  const [preview, setPreview] = useState<string | null>(null); // 이미지 미리보기 상태
  const inputRef = useRef<HTMLInputElement>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [votes, setVotes] = useState<VoteRow[]>([]);
  const userId = session?.user;

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedVotes = await getVotes();

        setVotes(fetchedVotes);
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
      const success = addVote({
        content: "새글",
        created_at: new Date().toISOString(),
        image: imageurl || "",
      });
    } catch (error) {
      console.error("Error while adding vote:", error);
    }
  };

  return (
    <S.MainContainer>
      <S.HeaderContainer>
        <S.MenuText>친구 목록 보기</S.MenuText>
        <S.MenuText>내가 쓴 글 보기</S.MenuText>
        <S.MenuText>전체 글 보기</S.MenuText>
        <S.MenuText>글 추가하기 +</S.MenuText>
      </S.HeaderContainer>
      <S.VoteContainer>
        <S.VoteHeader></S.VoteHeader>
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
            <S.ImageInput>
              <S.HiddenInput
                ref={inputRef}
                type="file"
                accept="image/*"
                id="file-upload"
                onChange={handleFileChange}
              />
              <S.UploadButton htmlFor="file-upload">이미지 선택</S.UploadButton>
            </S.ImageInput>
          </S.ImageContainer>
          <S.VoteMainLeft>
            <S.VoteTitleInput placeholder="제목을 입력하세요"></S.VoteTitleInput>
            <S.VotePriceInput placeholder="금액"></S.VotePriceInput>
            <S.VoteSubtitleInput placeholder="내용을 입력하세요"></S.VoteSubtitleInput>

            {/* <S.InputContainer>
            <S.TitleInput></S.TitleInput>
            <div onClick={onClickAddVote}>글 추가하기</div>
          </S.InputContainer> */}
          </S.VoteMainLeft>
        </S.VoteMain>

        <S.VoteFooter></S.VoteFooter>
      </S.VoteContainer>
      <VoteList />
    </S.MainContainer>
  );
}
