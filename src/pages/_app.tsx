import { useEffect } from 'react'
import { Provider } from 'urql'
import Session from 'supertokens-auth-react/recipe/session'
import { redirectToAuth } from 'supertokens-auth-react/recipe/emailpassword'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { pink } from '@mui/material/colors'
import Spinner from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import type { SSRData } from '@urql/core/dist/types/exchanges/ssr'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { initFrontend } from '../config/frontendConfig'
import client, { ssr } from '../utils/urql'
import { Todo } from '../graphql/generated'
import StoreProvider from '../components/StoreProvider'

initFrontend()

const theme = createTheme({
  palette: { secondary: pink },
})

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
    <ThemeWrapper>
      <Provider value={client}>
        <Component {...(pageProps as any)} />
      </Provider>
    </ThemeWrapper>
  )
}

const DevApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeWrapper>
      <StoreProvider>
        <Component {...(pageProps as any)} />
      </StoreProvider>
    </ThemeWrapper>
  )
}

export default DevApp

const ThemeWrapper: React.FC = ({ children }) => {
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
  pageProps: {
    fromSupertokens?: string
    urqlState?: SSRData
  }
}
