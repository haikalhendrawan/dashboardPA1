import {useState} from "react";
import {Card, Typography, Grid, Box, Tabs, Tab} from '@mui/material';
import {styled} from '@mui/material/styles';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Iconify from "../../components/Iconify";



export default function SelectionTab({tab, setTab}) { 

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };


  return(
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="2024" value={0} icon={<Iconify icon="mdi:cash-register" />} sx={{fontSize:12}} />
          <Tab label="2023" value={1} icon={<Iconify icon="mdi:transfer" />} sx={{fontSize:12}}/>
        </Tabs>
      </Box>
    </>
  )


}