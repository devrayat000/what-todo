import { AppProps, AppInitialProps, AppContext } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { pink } from '@mui/material/colors'
import SuperTokensReact from 'supertokens-auth-react'
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Session from 'supertokens-auth-react/recipe/session'
import { redirectToAuth } from 'supertokens-auth-react/recipe/emailpassword'
import Spinner from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

import { frontendConfig } from '../config/frontendConfig'
// import { createStore, Provider } from '../utils/store'
import { ITodo } from '../interfaces'
import { useEffect } from 'react'

async function initNode() {
  const supertokensNode = await import('supertokens-node')
  const { backendConfig } = await import('../config/backendConfig')
  supertokensNode.init(backendConfig())
}

if (typeof window !== 'undefined') {
  SuperTokensReact.init(frontendConfig())
} else {
  initNode().catch(console.error)
}

const theme = createTheme({
  palette: { secondary: pink },
})

const queryClient = new QueryClient()

const MyApp: NextApp = ({ Component, pageProps, router }) => {
  useEffect(() => {
    async function doRefresh() {
      console.log('app.tsx refresh effect')
      // pageProps.fromSupertokens === 'needs-refresh' will be true
      // when in getServerSideProps, getSession throws a TRY_REFRESH_TOKEN
      // error.

      if (pageProps.fromSupertokens === 'needs-refresh') {
        try {
          console.log('app.tsx retry')
          await Session.attemptRefreshingSession()
          location.reload()
        } catch (error) {
          console.log('app.tsx redirect', error)
          redirectToAuth({ redirectBack: true })
        }
        // if (await Session.attemptRefreshingSession()) {
        //   // post session refreshing, we reload the page. This will
        //   // send the new access token to the server, and then
        //   // getServerSideProps will succeed
        //   console.log('app.tsx retry')
        //   location.reload()
        // } else {
        //   // the user's session has expired. So we redirect
        //   // them to the login page
        //   console.log('app.tsx redirect')

        //   redirectToAuth({ redirectBack: true })
        // }
      }
    }
    doRefresh()
  }, [pageProps.fromSupertokens])

  if (pageProps.fromSupertokens === 'needs-refresh') {
    // in case the frontend needs to refresh, we show nothing.
    // Alternatively, you can show a spinner.

    return (
      <Backdrop open={true}>
        <Spinner />
      </Backdrop>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Provider createStore={createStore}> */}
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
      {/* </Provider> */}
    </ThemeProvider>
  )
}

export default MyApp

interface NextApp {
  (props: AppProps): JSX.Element
  getInitialProps?(context: AppContext): Promise<AppInitialProps>
}

declare module 'next/app' {
  interface AppInitialProps {
    todos: ITodo[]
    pageProps: any
  }
}

type MyAppProps = {
  pageProps: {
    dehydratedState: DehydratedState
  }
}
