import GlobalStyle from "../../styles/globalStyles";
import ClientThemeProvider from "./ClientThemeProvider";

export const metadata = {
  title: "JOGGI",
  description: "신개념 가계부 웹 어플리케이션",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientThemeProvider>
          <GlobalStyle />
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
