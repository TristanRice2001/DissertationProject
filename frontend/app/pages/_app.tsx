import "../styles/globals.css";
import type { AppProps } from "next/app";
import { theme } from "theme/theme";
import { ThemeProvider } from "styled-components";
import { ChallengeContextProvider } from "context/ChallengeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ChallengeContextProvider>
        <Component {...pageProps} />
      </ChallengeContextProvider>
    </ThemeProvider>
  );
}
