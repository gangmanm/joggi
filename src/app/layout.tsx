import ReactQueryClientProviders from "../../config/ReactQueryClientProvider";
import StyledComponentsRegistry from "./registry";
import LoadingWrapper from "../../components/LoadingWrapper";

export const metadata = {
  title: "JOGI",
  description: "신개념 가계부 웹 어플리케이션",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProviders>
      <html lang="en">
        <body>
          <StyledComponentsRegistry>
            <LoadingWrapper>{children}</LoadingWrapper>
          </StyledComponentsRegistry>
        </body>
      </html>
    </ReactQueryClientProviders>
  );
}
