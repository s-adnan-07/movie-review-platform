import { createTheme } from '@mui/material/styles'

const defaultTheme = createTheme({
  components: {
    MuiPaper: { defaultProps: { elevation: 12, sx: { p: 2 } } },
    MuiStack: { defaultProps: { spacing: 3 } },
    MuiGrid2: { defaultProps: { xs: 12 } },
    MuiTab: { defaultProps: { iconPosition: 'end' } },
    MuiButton: { defaultProps: { variant: 'contained' } },
  },
})

export const lightTheme = createTheme({
  ...defaultTheme,
  palette: { mode: 'light' },
})

export const darkTheme = createTheme({
  ...defaultTheme,
  palette: { mode: 'dark' },
})

export default defaultTheme
