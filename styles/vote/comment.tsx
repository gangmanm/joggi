import styled from "styled-components";

export const CommentContainer = styled.div`
  width: 100%;
  max-height: 200px;
  background-color: ${({ theme }) => theme.colors.mutual};
  border-radius: 12px;
  padding: 10px;
  overflow: scroll;

  /* 웹킷 브라우저에서 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const CommentHeader = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.lightmutual};
  font-weight: 600;

  margin-left: 5px;
`;
export const CommentInputContainer = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.lightmutual};
  border-radius: 10px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const CommentInput = styled.input`
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
  cursor: pointer;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  border-radius: 100%;
  background-color: white;
  overflow: hidden;
`;

export const CommentContent = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;
