import {useState, useEffect, useContext} from "react";
import {styled} from "@mui/material/styles";
import {Switch, Button, IconButton, Badge, Chip, Fab} from "@mui/material";
// import useMode, {ModeContext} from "../../../hooks/display/useMode";
import Iconify from '../../components/Iconify';
import useMode from "../../hooks/useMode";

// value dari useMode hook ada di ../theme/index.js
const initialMode = localStorage.getItem('mode');

// ---------------------------------------------------

const ThemeSwitcher = () => {
    const {mode, setMode} = useMode();
    const handleClick = () => {
        setMode((prev) => 
            prev==='dark'?'light':'dark'
        )
        const currentMode = localStorage.getItem('mode');
        const newMode = currentMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('mode', newMode);
    };

    return(
    <>
      <IconButton onClick={handleClick} variant='contained' size='large' sx={{mr:1}}>
          <Iconify icon={localStorage.getItem('mode')==='light'?"solar:sun-2-bold-duotone":"tdesign:mode-dark"}sx={{color:'orange'}} />    
      </IconButton>
    </>
    )
}

export default ThemeSwitcher;