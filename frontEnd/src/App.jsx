import { useState } from 'react'
import { BrowserRouter} from 'react-router-dom';
import Router from './route.jsx';

function App() {

  return (
    <>
    <BrowserRouter>
        <Router />
    </BrowserRouter>
    </>
  )
}

export default App
