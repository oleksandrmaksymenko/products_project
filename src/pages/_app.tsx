import type {AppProps} from 'next/app';
import {SessionProvider} from 'next-auth/react';
import {useEffect, useState} from 'react';
import Layout from 'src/components/Layout';
import {ThemeProvider} from '@mui/material/styles';
import {CacheProvider} from '@emotion/react';
import Switch from '@mui/material/Switch';
import createEmotionCache from 'src/styles/createEmotionCache';
import {darkTheme, lightTheme} from 'src/styles/theme';
import styled from '@emotion/styled';
import {Provider} from 'react-redux';
import {store} from '../store';
import 'src/styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

const Input = styled.input`
  position: fixed;
  top: 0;
  right: 0;
`.withComponent(Switch);

export default function App({
  Component,
  pageProps: {session, ...pageProps},
  emotionCache = clientSideEmotionCache,
}: AppProps & {emotionCache: any}) {
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const handleChange = () => {
    setTheme(!theme);
  };

  return (
    <Provider store={store}>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme ? lightTheme : darkTheme}>
            <Input onChange={handleChange} />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </CacheProvider>
      </SessionProvider>
    </Provider>
  );
}
