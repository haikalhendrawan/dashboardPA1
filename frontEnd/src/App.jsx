import { useState } from 'react'
import { BrowserRouter} from 'react-router-dom';
import Router from './route.jsx';
import ThemeProvider from './theme/index.jsx';

function App() {

  return (
    <>
    <ThemeProvider>
      <BrowserRouter>
          <Router />
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
