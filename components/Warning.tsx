"use client";
import * as S from "../styles/warning";

interface WarningProps {
  message: string;
  onYesAction: () => void;
  onNoAction: () => void;
}

export default function Warning({
  message,
  onYesAction,
  onNoAction,
}: WarningProps) {
  return (
    <S.WarningContainer>
      <S.WarningText>{message}</S.WarningText>
      <S.ButtonContainer>
        <S.Button onClick={onYesAction}>예</S.Button>
        <S.Button onClick={onNoAction}>아니오</S.Button>
      </S.ButtonContainer>
    </S.WarningContainer>
  );
}
