type PaletteVariantType = {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
};

type PaletteType = {
  mode: string;
  primary: PaletteVariantType & {
    text: string;
  };
  secondary: PaletteVariantType;
  error: PaletteVariantType;
  warning: PaletteVariantType;
  info: PaletteVariantType;
  success: PaletteVariantType;
  custom: {
    red: string;
  };
};

type Components = {
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        h1: string;
        h2: string;
        h3: string;
        h4: string;
        h5: string;
        h6: string;
        subtitle: string;
      };
    };
  };
};

declare module '@mui/material/styles' {
  interface Theme {
    palette: PaletteType;
    components: Components;
    size: {
      primary: string;
    };
  }
  interface ThemeOptions {
    palette?: PaletteType;
    components?: Components;
  }

  export const ThemeProvider;

  export const createTheme: (object: ThemeOptions) => Theme;
}
