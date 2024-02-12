import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Iconify from "../../components/Iconify";


export default function AppBar() {
  return (
    <Box sx={{ flexGrow: 1, borderBottom:1, borderColor:'divider'}} >
        <Toolbar>
          <Box sx={{height:40, width:40}}>
            <img src="/dashboard-logo.png" alt="logo" style={{height:'100%', width:'100%'}}/>
          </Box>
          
          {/* <Typography variant="h5" color='error'> Dashboard </Typography> */}

          <Box sx={{ flexGrow:1 }} />

          <Button variant='outlined' color='primary' sx={{borderRadius:'12px'}}>
            <Iconify icon="mdi:login" sx={{mr:1}}/>
            Data
          </Button>
        </Toolbar>
    </Box>
  );
}