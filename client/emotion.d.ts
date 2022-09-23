import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colorScheme: string;
    colors: {
      blue: string[];
      gray: string[];
      dark: string[];
      primary: string;
      secondary: string;
      background: string;
      white: string;
    };
    space: string[];
    border: {
      radius: string;
    };
  }
}
