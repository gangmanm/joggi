import styled from "styled-components";

export const MainContainer = styled.div`
  width: 450px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  z-index: 20;
  overflow: scroll; /* 스크롤바 제거 */
  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100vw;
    height: 100vh;
  }

  /* 웹킷 브라우저에서 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  display: flex;
  align-items: center;
  border-radius: 5px;
`;

export const MenuText = styled.div`
  color: ${({ theme }) => theme.colors.mutual};
  cursor: pointer;
  border-radius: 12px;
`;

export const VoteContainer = styled.div`
  width: 100%;
  border: 3px solid ${({ theme }) => theme.colors.mutual};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 10px;
`;

export const VoteHeader = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.lightmutual};
  padding: 8px;
  font-weight: 600;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.mutual};
  border-radius: 5px;
`;

export const VoteHeaderLeft = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const VoteHeaderRight = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const VoteMain = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
`;

export const VoteFooter = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  display: flex;
  align-items: center;
  margin-top: 10px;
  border-radius: 10px;
`;

export const VoteFooterLeft = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const VoteFooterRight = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: white;
  overflow: hidden;
  margin-right: 10px;
`;

export const VoteMainLeft = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const VoteTitle = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.mutual};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  font-weight: 600;
`;

export const VoteTitleInput = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.colors.mutual};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  font-weight: 600;
`;

export const VotePrice = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.mutual};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  font-weight: 600;
`;

export const VotePriceInput = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.colors.mutual};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  font-weight: 600;
`;

export const VoteSubtitle = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.mutual};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
`;

export const VoteSubtitleInput = styled.textarea`
  width: 100%;
  max-width: 300px; /* 적절한 너비 제한 */
  height: 300px;
  color: ${({ theme }) => theme.colors.mutual};
  padding: 10px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  word-wrap: break-word; /* 긴 단어 줄바꿈 */
  white-space: normal; /* 기본 줄바꿈 허용 */
  resize: none; /* 크기 조절 비활성화 */
`;

export const VoteButtonContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainLeftBottomContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LikeContainer = styled.div`
  width: 60px;
  height: 30px;
  display: flex;
  justify-content: center;
  margin-right: 10px;
`;

export const LikeImageContainer = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-right: 10px;
`;

export const LikeAmtContainer = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.mutual};
`;

export const ImageContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mutual};
  border-radius: 12px;
`;

export const InputContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.mutual};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
export const ImageInput = styled.div`
  height: 100%;
`;

export const ImageUploadButton = styled.input`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  text-align: center;
  color: violet;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const UploadButton = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutual};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  margin-left: 10px;
  font-weight: 600;
`;

export const TitleInput = styled.input`
  width: 90%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  text-align: center;
  color: white;
`;
