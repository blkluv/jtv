import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface TypeText {
    icon?: string;
  }

  interface TypeBackground {
    header?: string;
    footer?: string;
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      black: '#2e2e2e',
      white: '#ffffff',
    },
    primary: {
      light: 'rgb(97, 87, 255)',
      main: 'rgb(97, 87, 255)',
      darker: '#ea6c00',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8fe9d0',
    },
    text: {
      disabled: '#777777',
      icon: '#ff963c',
      primary: '#414141',
    },
    background: {
      default: '#161b22',
      paper: '#161b22',
      header: '#000',
      footer: '#000',
    },
  },
});

export default theme;
