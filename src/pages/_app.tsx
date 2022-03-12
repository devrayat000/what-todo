import { useEffect } from 'react'
import { Provider } from 'urql'
import Session from 'supertokens-auth-react/recipe/session'
import { redirectToAuth } from 'supertokens-auth-react/recipe/emailpassword'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Spinner from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import type { SSRData } from '@urql/core/dist/types/exchanges/ssr'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { initFrontend } from '../config/frontendConfig'
import client, { ssr } from '../utils/urql'
import { Todo } from '../graphql/generated'
import StoreProvider from '../components/StoreProvider'
import { useTodoStore } from '../utils/store'
import createCache from '../styles/cache'
import { CacheProvider, EmotionCache } from '@emotion/react'

// initFrontend()

const clientSideEmotionCache = createCache()

const MyApp: NextPage<MyAppProps> = ({ Component, pageProps, router }) => {
  useEffect(() => {
    if (pageProps.urqlState) {
      ssr.restoreData(pageProps.urqlState)
    }
  }, [pageProps.urqlState])

  useEffect(() => {
    async function doRefresh() {
      if (pageProps.fromSupertokens === 'needs-refresh') {
        try {
          await Session.attemptRefreshingSession()
          location.reload()
        } catch (error) {
          console.log('app.tsx redirect', error)
          redirectToAuth({ redirectBack: true })
        }
      }
    }
    doRefresh()
  }, [pageProps.fromSupertokens])

  if (pageProps.fromSupertokens === 'needs-refresh') {
    return (
      <Backdrop open={true}>
        <Spinner />
      </Backdrop>
    )
  }

  return (
    // <CacheProvider value={emotionCache}>
    <ThemeWrapper>
      <Provider value={client}>
        <Component {...(pageProps as any)} />
      </Provider>
    </ThemeWrapper>
    // </CacheProvider>
  )
}

const DevApp: NextPage<MyAppProps> = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <StoreProvider>
        <ThemeWrapper>
          <Component {...(pageProps as any)} />
        </ThemeWrapper>
      </StoreProvider>
    </CacheProvider>
  )
}

export default DevApp

const ThemeWrapper: React.FC = ({ children }) => {
  const theme = useTodoStore(store => store.theme.item)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

declare module 'next/app' {
  interface AppInitialProps {
    todos: Todo[]
    pageProps: any
  }
}

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
  pageProps: {
    fromSupertokens?: string
    urqlState?: SSRData
  }
}
