import { useState } from 'react'
import CssBaseline  from '@mui/material/CssBaseline';
import { BrowserRouter} from 'react-router-dom';
import StyledChart from './components/Charts/styles.jsx';
import Router from './route.jsx';
import ThemeProvider from './theme/index.jsx';
import { DipaProvider } from "./sections/home/useDIPA.jsx";


function App() {

  return (
    <>
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <StyledChart />
          <Router />
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
