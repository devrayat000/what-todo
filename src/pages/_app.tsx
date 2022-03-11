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
import type { ITodo } from '../interfaces'

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider value={client}>
        <Component {...(pageProps as any)} />
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp
declare module 'next/app' {
  interface AppInitialProps {
    todos: ITodo[]
    pageProps: any
  }
}

interface MyAppProps extends AppProps {
  pageProps: {
    fromSupertokens?: string
    urqlState?: SSRData
  }
}
