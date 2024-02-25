import {useState, useEffect, useContext} from "react";
import {styled, alpha, useTheme} from "@mui/material/styles";
import {Popover, Button, Box, Popper, Paper, Fade, ClickAwayListener, Typography} from "@mui/material";
import Iconify from '../../../components/Iconify';

const style = {
  boxShadow:"0px 5px 5px -3px rgba(145, 158, 171, 0.2), 0px 8px 10px 1px rgba(145, 158, 171, 0.14), 0px 3px 14px 2px rgba(145, 158, 171, 0.12)",
  p: 1,
  mt: 1.5,
  ml: 0.75,
  width: 150,
  typography: 'body2',
  borderRadius: '8px',
  display:'flex',
  flexDirection:'column'
};

const StyledButton = styled(Button)(({theme}) => ({
  color:theme.palette.text.primary,
  fontWeight:theme.typography.fontWeightRegular,
  width:'100%',
  justifyContent:'flex-start'
}))

export default function DataSelectPopper2(props) { 
  const theme = useTheme();
  const value = props.value;

  const handleClick = (event) => {
    props.changeValue(event.target.value)
  };

  const selectedSx= {fontWeight:theme.typography.fontWeightMedium, backgroundColor:theme.palette.background.neutral}

  //
  return(
    <Popper
      open={Boolean(props.open)} 
      anchorEl={props.open} 
      placement={'bottom'} 
      transition sx={{ zIndex: 1102}}
    >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={style}>
              <ClickAwayListener onClickAway={props.close}>
              <Box>
                <StyledButton value={0} onClick={(e) => handleClick(e)} sx={value==0 && selectedSx}>
                  Last 30 Day
                </StyledButton>
                <StyledButton value={1} onClick={(e) => handleClick(e)} sx={value==1 && selectedSx}>
                  This Month
                </StyledButton>
                <StyledButton value={2} onClick={(e) => handleClick(e)}sx={value==2 && selectedSx}>
                 All Year
                </StyledButton>
              </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
    </Popper>
  )
}