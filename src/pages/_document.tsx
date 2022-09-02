import React from 'react';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Main,
  Head,
  NextScript,
} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from 'src/styles/createEmotionCache';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const {extractCriticalToChunks} = createEmotionServer(cache);
    const initialProps = await Document.getInitialProps(ctx);

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // @ts-ignore
          enhanceApp: (App: JSX.IntrinsicAttributes) =>
            function EnhanceApp(props: JSX.IntrinsicAttributes) {
              // @ts-ignore
              return <App emotionCache={cache} {...props} />;
            },
        });

      const emotionStyles = extractCriticalToChunks(initialProps.html);

      const emotionStyleTags = emotionStyles.styles.map(style => (
        <style
          data-emotion={`${style.key} ${style.ids.join(' ')}`}
          key={style.key}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{__html: style.css}}
        />
      ));

      return {
        ...initialProps,
        styles: [
          ...React.Children.toArray(initialProps.styles),
          ...emotionStyleTags,
        ],
      };
    } catch (e) {
      console.log(e, ' <<<< error');
    }

    return {
      ...initialProps,
      styles: [],
    };
  }

  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
