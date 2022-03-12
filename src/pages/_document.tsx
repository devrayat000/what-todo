import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'

import createCache from '../styles/cache'
import { lightTheme } from '../styles/theme'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const renderPage = ctx.renderPage

    const cache = createCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    ctx.renderPage = () =>
      renderPage({
        enhanceApp: (App: any) => props => {
          return <App emotionCache={cache} {...props} />
        },
      })

    const initialProps = await Document.getInitialProps(ctx)
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map(style => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ))

    return { ...initialProps, emotionStyleTags }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name='theme-color' content={lightTheme.palette.primary.main} />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin=''
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Josefin+Sans:400,600,700&display=swap'
          />
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
