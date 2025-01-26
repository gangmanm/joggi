import styled from "styled-components";

export const MainContainer = styled.div`
  width: 450px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  z-index: 20;
  overflow: scroll;
  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100vw;
    height: 100vh;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-evenly;
`;

export const MenuText = styled.div`
  color: ${({ theme }) => theme.colors.mutual};
`;

export const VoteContainer = styled.div`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.lightmutual};
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const VoteHeader = styled.div`
  width: 100%;
  height: 50px;
`;

export const VoteMain = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
`;

export const VoteFooter = styled.div`
  width: 100%;
  height: 50px;
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
  font-size: 10px;
  font-weight: 600;
`;

export const VoteSubtitleInput = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.colors.mutual};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  font-size: 10px;
  font-weight: 600;
`;

export const VoteButtonContainer = styled.div`
  width: 100%;
  height: 30px;
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
  width: 100%;
  height: 80%;
  background-color: white;
`;
export const ImageInput = styled.div`
  width: 100%;
  height: 20%;
`;

export const ImageUploadButton = styled.input`
  width: 90%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  text-align: center;
  background-color: white;
  color: violet;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const UploadButton = styled.label`
  display: inline-block;

  width: 100%;
  height: 30px;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.lightmutual};
  background-color: ${({ theme }) => theme.colors.mutual};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
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
