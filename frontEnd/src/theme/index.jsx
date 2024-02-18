import { useMemo, useState, createContext, useEffect } from 'react';
import {ThemeProvider as MuiThemeProvider, createTheme} from "@mui/material/styles";


import typography from './typography';
import Card from "./override/Card"
import ComponentsOverrides from './override';
import customShadows from './customShadows';
import GlobalStyles from './globalStyles';
import palette, {paletteDark, GREY, PRIMARY, SECONDARY, INFO, SUCCESS, WARNING, ERROR} from './palette';
import useMode, {ModeContext} from '../hooks/useMode';


export default function ThemeProvider({children}) {
  const [mode, setMode] = useState('light');

  const themeOptions = {
    palette:localStorage.getItem('mode') === 'dark' ? paletteDark : palette,
    typography,
    customShadows: customShadows()
  };
  const theme = createTheme(themeOptions);
  theme.components = ComponentsOverrides(theme);
  
  return(
    <MuiThemeProvider theme={theme}>
      <GlobalStyles />
      <ModeContext.Provider value={{mode, setMode}}>
        {children}
      </ModeContext.Provider>
    </MuiThemeProvider>
  )
}