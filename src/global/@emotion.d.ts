import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    palette: {
      mode: string;
      primary: {
        text: string;
      };
      custom: {
        red: string;
      };
      tertiary: {
        main: string;
      };
    };
    size: {
      primary: string;
    };
  }
}
