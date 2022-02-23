import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { AlertTemplate } from "../components/shared";
import { ContextProvider } from "../context/context";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ContextProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </AlertProvider>
    </ContextProvider>
  );
}

export default MyApp;
