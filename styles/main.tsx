import { styled } from "styled-components";
import Image from "next/image";

export const Main = styled.div`
  width: 500px;
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

export const Header = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 287px;
  height: 91px;
`;

export const Title = styled.div`
  width: 100%;
  height: 76px;
  font-size: 67px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.point};
  text-align: center;
`;

export const LoginButton = styled.div`
  width: 173px;
  height: 47px;
  background-color: ${({ theme }) => theme.colors.point};
  box-shadow: inset 0px 3px 3px rgba(110, 110, 110, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 19px;
  border-radius: 13px;
`;
