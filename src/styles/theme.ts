import {
  createTheme,
  BreakpointsOptions,
  PaletteColorOptions,
  Palette,
} from '@mui/material/styles'
import { blue } from '@mui/material/colors'
import type { TypographyOptions } from '@mui/material/styles/createTypography'

const breakpoints: BreakpointsOptions = {
  values: {
    xs: 0,
    sm: 375,
    md: 768,
    lg: 1200,
    xl: 1440,
  },
}

const primaryColor: PaletteColorOptions = {
  ...blue,
  main: 'hsl(220, 98%, 61%)',
}

const typography = (palette: Palette): TypographyOptions => ({
  fontFamily: ['"Josefin Sans"', 'sans-serif'].join(', '),
  fontSize: 18,
  fontWeightBold: 700,
  fontWeightLight: 400,
  h4: {
    color: palette.background.default,
    letterSpacing: 12,
  },
})

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: primaryColor,
    background: {
      default: 'hsl(0, 0%, 98%)',
    },
  },
  breakpoints,
  typography,
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: primaryColor,
    background: {
      default: 'hsl(235, 21%, 11%)',
    },
  },
  breakpoints,
  typography,
})

// it could be your App.tsx file or theme file that is included in your tsconfig.json
import { Theme } from '@mui/material/styles'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)
  interface DefaultTheme extends Theme {}
}
