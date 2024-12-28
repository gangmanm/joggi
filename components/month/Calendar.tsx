import * as S from "../../styles/month/calendar";
import useCalendarContext from "./useCalendarContext";
import { useState, useEffect } from "react";
import { getBudget } from "../../actions/budget-actions";
import { createClient } from "../../utils/supabase/client";
import { Budget } from "../../src/types/budget";

interface DayInfo {
  date: string;
  day: number;
  month: string;
  dayIndexOfWeek: number;
}

const CalendarBody: React.FC = () => {
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const { daysInMonth, selectedDate, currentDate } = useCalendarContext();
  const [entries, setEntries] = useState<Budget[]>([]);

  const supabase = createClient();

  // daysInMonth 배열의 타입 변환
  const parsedDaysInMonth: DayInfo[] = daysInMonth.map((day) => ({
    ...day,
    day: Number(day.day), // day 값을 숫자로 변환
  }));

  // 배열을 7일씩 나누는 함수
  const chunkDays = (array: DayInfo[], size: number): DayInfo[][] => {
    const result: DayInfo[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const weeksInMonth = chunkDays(parsedDaysInMonth, 7);

  // 날짜별로 Budget 데이터를 그룹화하여 totalIncomeValue 계산
  const calculateIncomeByDate = () => {
    const incomeByDate: Record<string, number> = {};
    entries.forEach((entry) => {
      if (entry.setting === "income") {
        const date = entry.created_at.split("T")[0]; // YYYY-MM-DD 형식 추출
        if (!incomeByDate[date]) {
          incomeByDate[date] = 0;
        }
        incomeByDate[date] += parseFloat(entry.amount || "");
      }
    });

    return incomeByDate;
  };

  const incomeByDate = calculateIncomeByDate();

  useEffect(() => {
    let isMounted = true;

    const fetchSessionAndBudgets = async () => {
      const { data } = await supabase.auth.getSession();
      if (isMounted) {
        if (data.session?.user.id) {
          const budgets = await getBudget(data.session.user.id);
          setEntries(budgets.reverse());
        }
      }
    };

    fetchSessionAndBudgets();

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  return (
    <S.MonthContainer>
      <S.DayWrapper>
        {weeks.map((week, index) => (
          <S.CalendarItem $isSunday={index === 0} key={week}>
            {week}
          </S.CalendarItem>
        ))}
      </S.DayWrapper>

      {weeksInMonth.map((week, weekIndex) => (
        <S.DayWrapper key={`week-${weekIndex}`}>
          {week.map((date) => (
            <S.Day
              onClick={() => selectedDate.selectDate(date.date)}
              $isCurrentMonth={currentDate.month === date.month}
              $isSelectedDate={selectedDate.date === date.date}
              $isSunday={date.dayIndexOfWeek === 0}
              className={date.month}
              key={date.date}
              $isProfit={incomeByDate[date.date] > 0}
            >
              <span>{date.day}</span>
              {incomeByDate[date.date] !== undefined && (
                <S.PriceContainer>
                  {incomeByDate[date.date] > 0
                    ? `+ ${incomeByDate[date.date].toLocaleString()}`
                    : `- ${Math.abs(incomeByDate[date.date]).toLocaleString()}`}
                </S.PriceContainer>
              )}
            </S.Day>
          ))}
        </S.DayWrapper>
      ))}
    </S.MonthContainer>
  );
};

export default CalendarBody;
