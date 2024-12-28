import styled from "styled-components";

export const TagContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -200%);
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.74);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 270px;
  height: 90px;

  display: flex;
  flex-wrap: wrap; /* 자식 요소가 줄 바꿈 가능 */
  overflow-y: scroll;
  overflow-x: hidden;
  padding-top: 5px;
  padding-bottom: 5px;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

export const TagBox = styled.div<{ setting: string }>`
  width: 120px;
  height: 30px;
  margin-left: 7px;
  margin-right: 7px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.point : theme.colors.secondary};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TagInput = styled.input<{ setting: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-weight: 500;
  &::placeholder {
    color: ${({ theme, setting }) =>
      setting === "income" ? theme.colors.primary : theme.colors.secondary};
    font-weight: 600;
  }
  color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.secondary : theme.colors.point};
`;

export const TagText = styled.div<{ setting: string }>`
  width: calc(100% - 30px);
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-weight: 500;
  color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.secondary : theme.colors.point};
`;

export const TagButton = styled.div<{ setting: string }>`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.secondary : theme.colors.point};
  font-weight: 500;
`;
