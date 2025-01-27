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
  justify-content: space-around;
`;

export const MenuText = styled.div`
  color: ${({ theme }) => theme.colors.mutual};
  cursor: pointer;
`;

export const FriendInputContainer = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.lightmutual};
  border-radius: 15px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
`;

export const FriendInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  ::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`;

export const AddButton = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
`;
