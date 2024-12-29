import { styled } from "styled-components";

export const Main = styled.div`
  width: 450px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100vw;
    height: 100vh;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 150px;
  height: 60px;
`;

export const Title = styled.div`
  width: 100%;
  height: 76px;
  font-size: 67px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.mutual};
  text-align: center;
`;

export const LoginButton = styled.div`
  width: 150px;
  height: 47px;
  background-color: ${({ theme }) => theme.colors.mutual};
  box-shadow: inset 0px 3px 3px rgba(110, 110, 110, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 19px;
  border-radius: 13px;
  cursor: pointer;
  font-weight: 600;
`;

export const GoogleImageContainer = styled.div`
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
