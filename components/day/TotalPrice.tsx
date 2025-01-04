"use client";
import * as S from "../../styles/day/total-price";
import useCalendarContext from "../month/useCalendarContext";
interface PriceProps {
  setting: string;
  toggleGeneratePriceAction: () => void;
  totalAmount: string;
  setSettingAction: (setting: string) => void;
}

export default function TotalPrice({
  setting,
  toggleGeneratePriceAction,
  totalAmount,
  setSettingAction,
}: PriceProps) {
  const { selectedDate } = useCalendarContext();

  const onClickIncomeButton = () => {
    toggleGeneratePriceAction();
    setSettingAction("income");
  };

  const onClickOutcomeButton = () => {
    toggleGeneratePriceAction();
    setSettingAction("outcome");
  };
  return (
    <S.TotalPriceMain>
      <S.PriceAddButton setting={"income"} onClick={onClickIncomeButton}>
        +
      </S.PriceAddButton>
      <S.TotalPriceContainer setting={setting}>
        <S.SelectedDate>{selectedDate.date}</S.SelectedDate>
        <S.TotalPriceText setting={setting}>
          {parseInt(totalAmount) > 0
            ? `+${totalAmount}`
            : parseInt(totalAmount) < 0
            ? `${totalAmount}`
            : totalAmount}
        </S.TotalPriceText>
      </S.TotalPriceContainer>
      <S.PriceAddButton setting={"outcome"} onClick={onClickOutcomeButton}>
        -
      </S.PriceAddButton>
    </S.TotalPriceMain>
  );
}
