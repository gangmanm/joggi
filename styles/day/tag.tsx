import styled from "styled-components";

export const TagContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -160%);
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.74);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 270px;
  height: 106px;

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
`;
