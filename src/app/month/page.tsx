"use client";
import CalendarBody from "../../../components/month/Calendar";
import { CalendarContext } from "../../../components/month/useCalendarContext";
import useCalendar from "../../hooks/useCalendar";
import CalendarHeader from "../../../components/month/CalendarHeader";

export default function Month() {
  const calendar = useCalendar();
  return (
    <div>
      <CalendarContext.Provider value={calendar}>
        <CalendarHeader />
        <CalendarBody />
      </CalendarContext.Provider>
    </div>
  );
}
