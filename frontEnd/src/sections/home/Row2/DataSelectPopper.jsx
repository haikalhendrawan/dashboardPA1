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

export default function DataSelectPopper(props) { 
  const theme = useTheme();
  const [period, setPeriod] = useState(0);

  const handleClick = (event) => {
    props.changeValue(event.target.value)
    console.log(event.target.value)
  };

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
                <StyledButton value={0} onClick={(e) => handleClick(e)} sx={period===0 && {fontWeight:theme.typography.fontWeightMedium, backgroundColor:theme.palette.background.paper}}>
                  Last 30 Days
                </StyledButton>
                <StyledButton value={1} onClick={(e) => handleClick(e)} sx={period===1 && {fontWeight:theme.typography.fontWeightMedium, backgroundColor:theme.palette.background.paper}}>
                  Current Month
                </StyledButton>
                <StyledButton value={2} onClick={(e) => handleClick(e)}sx={period===2 && {fontWeight:theme.typography.fontWeightMedium, backgroundColor:theme.palette.background.paper}}>
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