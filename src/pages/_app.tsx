import type {AppProps} from 'next/app';
import {SessionProvider} from 'next-auth/react';
import React, {useEffect} from 'react';
import Head from 'next/head';
import {ThemeProvider} from '@mui/material/styles';
import {CacheProvider} from '@emotion/react';
import {useAppSelector} from 'src/store/hooks';
import createEmotionCache from 'src/styles/createEmotionCache';
import {darkTheme, lightTheme} from 'src/styles/theme';
import {wrapper} from '../store';
import 'src/styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

function App({
  Component,
  pageProps: {session, ...pageProps},
  emotionCache = clientSideEmotionCache,
}: AppProps & {emotionCache: any}) {
  const theme = useAppSelector(state => state);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  // TODO: Page props can pass props and I can configure Layout
  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </Head>
      <SessionProvider session={session}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme ? lightTheme : darkTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </SessionProvider>
    </>
  );
}

export default wrapper.withRedux(App);
