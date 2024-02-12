import { useState } from 'react'
import CssBaseline  from '@mui/material/CssBaseline';
import { BrowserRouter} from 'react-router-dom';
import Router from './route.jsx';
import ThemeProvider from './theme/index.jsx';


function App() {

  return (
    <>
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
          <Router />
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
