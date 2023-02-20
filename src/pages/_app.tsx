import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
import { SidebarProvider } from "@/shared/contexts/SidebarContext";
import { ConfirmationDialogProvider } from "@/shared/contexts/ConfirmationDialogContext";
import ConfirmationDialog from "@/shared/components/confirmationDialog/ConfirmationDialog";
import { SnackbarProvider } from "notistack";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SidebarProvider>
          <SnackbarProvider
            iconVariant={{
              success: "✅",
              error: "✖️",
              warning: "⚠️",
              info: "ℹ️",
            }}
            maxSnack={5}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            preventDuplicate
          >
            <Component {...pageProps} />
          </SnackbarProvider>
        </SidebarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
