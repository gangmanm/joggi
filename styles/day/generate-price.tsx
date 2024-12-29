import { styled } from "styled-components";

export const MainContainer = styled.div<{ setting: string; tagcolor: string }>`
  width: 450px;
  height: 500px;
  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100vw;
    height: 50vh;
  }
  background-color: ${({ tagcolor }) => tagcolor};
  position: fixed;
  bottom: 0;
  align-items: center;
  margin-top: 12px;
  border-radius: 36px 36px 0px 0px;
  padding: 20px;
`;

export const InputContainer = styled.div`
  width: 100%;
  height: 30%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputTopContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
`;
export const InputBottomContainer = styled.div`
  width: 100%;
  height: 50%;
`;

export const InputTagContainer = styled.div<{ tagcolor: string }>`
  width: 30%;
  height: 100%;
  background-color: white;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ tagcolor }) => tagcolor};
  font-weight: 600;
`;

export const InputNameContainer = styled.div`
  width: 70%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
export const TagContainer = styled.div<{ setting: string }>`
  width: 30%;
  height: 100%;
  font-weight: 700;
  font-size: 13px;
  background-color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.point : theme.colors.secondary};

  color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.secondary : theme.colors.point};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PriceContainer = styled.div<{ setting: string }>`
  width: 70%;
  height: 100%;
  color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.point : theme.colors.secondary};
`;

export const PriceName = styled.input<{ setting: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-bottom: 2px solid white;
`;

export const Price = styled.input.attrs({
  type: "number",
})<{ setting: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  border-bottom: 2px solid white;
  color: white;
  font-size: 17px;
  padding-left: 5px;
`;

export const TagMenu = styled.div`
  width: 100%;
  height: 10%;
`;
