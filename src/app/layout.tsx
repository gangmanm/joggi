"use client";

import ReactQueryClientProviders from "../../config/ReactQueryClientProvider";
import StyledComponentsRegistry from "./registry";
import LoadingWrapper from "../../components/LoadingWrapper";
import { CalendarContext } from "../../components/month/useCalendarContext";
import useCalendar from "../hooks/useCalendar";

const metadata = {
  title: "JOGI",
  description: "신개념 가계부 웹 어플리케이션",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const calendar = useCalendar();

  return (
    <ReactQueryClientProviders>
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body>
          <CalendarContext.Provider value={calendar}>
            <StyledComponentsRegistry>
              <LoadingWrapper>{children}</LoadingWrapper>
            </StyledComponentsRegistry>
          </CalendarContext.Provider>
        </body>
      </html>
    </ReactQueryClientProviders>
  );
}
