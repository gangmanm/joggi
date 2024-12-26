"use client";

interface PriceContainerProps {
  setting: string;
}

export default function PriceContainer({ setting }: PriceContainerProps) {
  return (
    <div>
      <h1>{`현재 설정: ${setting}`}</h1>
    </div>
  );
}
