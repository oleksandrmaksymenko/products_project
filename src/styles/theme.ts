import {
  blueGrey,
  lightBlue,
  red,
  blue,
  deepOrange,
  green,
} from '@mui/material/colors';
import {createTheme} from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      text: blueGrey[100],
      main: blueGrey[900],
      dark: lightBlue[600],
      contrastText: lightBlue[50],
      light: lightBlue[300],
    },
    secondary: {
      main: lightBlue[600],
      dark: lightBlue[600],
      contrastText: lightBlue[50],
      light: lightBlue[300],
    },
    success: {
      main: lightBlue[600],
      dark: lightBlue[600],
      contrastText: lightBlue[50],
      light: lightBlue[300],
    },
    error: {
      main: red[600],
      dark: lightBlue[600],
      contrastText: lightBlue[50],
      light: lightBlue[300],
    },
    info: {
      main: lightBlue[600],
      dark: lightBlue[600],
      contrastText: lightBlue[50],
      light: lightBlue[300],
    },
    warning: {
      main: lightBlue[600],
      dark: lightBlue[600],
      contrastText: lightBlue[50],
      light: lightBlue[300],
    },
    tertiary: {
      main: red[600],
      dark: red[600],
      contrastText: red[50],
      light: red[300],
    },
    custom: {
      red: '#f33',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle: 'p',
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      text: blueGrey[100],
      main: blueGrey[900],
      dark: lightBlue[600],
      contrastText: lightBlue[50],
      light: lightBlue[300],
    },
    secondary: {
      main: lightBlue[600],
      dark: lightBlue[600],
      contrastText: lightBlue[50],
      light: lightBlue[300],
    },
    tertiary: {
      main: red[600],
      dark: red[600],
      contrastText: red[50],
      light: red[300],
    },
    success: {
      main: green[600],
      dark: lightBlue[600],
      contrastText: lightBlue[50],
      light: lightBlue[300],
    },
    error: {
      main: red[600],
      dark: lightBlue[600],
      contrastText: lightBlue[50],
      light: lightBlue[300],
    },
    info: {
      main: blue[600],
      dark: lightBlue[900],
      contrastText: lightBlue[50],
      light: lightBlue[300],
    },
    warning: {
      main: deepOrange[600],
      dark: lightBlue[600],
      contrastText: lightBlue[50],
      light: lightBlue[300],
    },
    custom: {
      red: '#f33',
    },
  },
});
