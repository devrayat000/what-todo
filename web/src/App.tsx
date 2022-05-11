import { CssBaseline, ThemeProvider } from '@mui/material'
import { StoreProvider } from 'easy-peasy'

import { useTodoStore, store } from '$lib/utils/store'
import HomePage from './pages'

function App() {
  return (
    // @ts-ignore next-line
    <StoreProvider store={store}>
      <ThemeWrapper>
        <HomePage />
      </ThemeWrapper>
    </StoreProvider>
  )
}

export default App

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useTodoStore(store => store.theme.item)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
