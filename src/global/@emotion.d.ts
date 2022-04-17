import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    palette: {
      mode: string;
      primary: {
        main: string;
        text: string;
      };
      custom: {
        red: string;
      };
    };
  }
}
