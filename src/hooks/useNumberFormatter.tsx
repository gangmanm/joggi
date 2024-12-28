import { useMemo } from "react";

export const useNumberFormatter = (value: string | number) => {
  const formattedValue = useMemo(() => {
    if (typeof value === "number") {
      value = value.toString();
    }
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, [value]);

  return formattedValue;
};
