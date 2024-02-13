import {useState, useEffect, useContext} from "react";
import {styled, alpha, useTheme} from "@mui/material/styles";
import {Switch, Button, IconButton, Stack, Popper, Paper, Fade, ClickAwayListener, Typography} from "@mui/material";
import Iconify from '../../components/Iconify';


export default function DataPeriodPopper(props) { 
  const [open, setOpen] = useState(true);
  return(
    <Popper open={open} anchorEl={props.anchorEl} placement={'bottom'} transition sx={{ zIndex: 1102}}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{boxShadow:"0px 5px 5px -3px rgba(145, 158, 171, 0.2), 0px 8px 10px 1px rgba(145, 158, 171, 0.14), 0px 3px 14px 2px rgba(145, 158, 171, 0.12)"}}>
              <ClickAwayListener onClickAway={()=>setOpen(false)}>
              <div>
                <Typography>ABC</Typography>
              </div>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
    </Popper>
  )
}