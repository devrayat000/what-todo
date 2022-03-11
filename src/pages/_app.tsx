import { useEffect } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { pink } from '@mui/material/colors'
import SuperTokensReact from 'supertokens-auth-react'
// import {
//   DehydratedState,
//   Hydrate,
//   QueryClient,
//   QueryClientProvider,
// } from 'react-query'
import Session from 'supertokens-auth-react/recipe/session'
import { redirectToAuth } from 'supertokens-auth-react/recipe/emailpassword'
import Spinner from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

import { frontendConfig } from '../config/frontendConfig'
// import { createStore, Provider } from '../utils/store'
import { ITodo } from '../interfaces'
import { Provider } from 'urql'
import client from '../utils/urql'

async function initNode() {
  const supertokensNode = await import('supertokens-node')
  const { backendConfig } = await import('../config/backendConfig')
  supertokensNode.init(backendConfig())
}

if (typeof window !== 'undefined') {
  SuperTokensReact.init(frontendConfig())
}

const theme = createTheme({
  palette: { secondary: pink },
})

// const queryClient = new QueryClient()

const MyApp: NextPage<MyAppProps> = ({ Component, pageProps, router }) => {
  useEffect(() => {
    async function doRefresh() {
      console.log('app.tsx refresh effect')

      if (pageProps.fromSupertokens === 'needs-refresh') {
        try {
          console.log('app.tsx retry')
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
    // dehydratedState: DehydratedState
    fromSupertokens?: string
  }
}
