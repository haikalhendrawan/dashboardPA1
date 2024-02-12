import { useMemo, useState, createContext, useEffect } from 'react';
import {ThemeProvider as MuiThemeProvider, createTheme} from "@mui/material/styles";

import typography from './typography';
import Card from "./override/Card"
import ComponentsOverrides from './override';
import customShadows from './customShadows';
import palette, {paletteDark, GREY, PRIMARY, SECONDARY, INFO, SUCCESS, WARNING, ERROR} from './palette';


export default function ThemeProvider({children}) {
  const themeOptions = {
    palette:palette,
    typography,
    customShadows: customShadows()
  };
  const theme = createTheme(themeOptions);
  theme.components = ComponentsOverrides(theme);
  
  return(
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  )
}