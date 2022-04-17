import type {AppProps} from 'next/app';
import {SessionProvider} from 'next-auth/react';
import {useEffect} from 'react';
import Layout from 'src/components/Layout';
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

  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme ? lightTheme : darkTheme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}

export default wrapper.withRedux(App);
