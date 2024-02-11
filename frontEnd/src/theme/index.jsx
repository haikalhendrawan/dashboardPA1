import { useMemo, useState, createContext, useEffect } from 'react';
import {ThemeProvider as MuiThemeProvider, createTheme} from "@mui/material/styles";
import typography from './typography';



export default function ThemeProvider({children}) {
  const themeOptions = {
    typography
  };
  const theme = createTheme(themeOptions)
  
  return(
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  )
}