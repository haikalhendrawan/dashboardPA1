import {useState} from "react";
import {Card, Typography, Grid, Box, Tabs, Tab} from '@mui/material';
import {styled} from '@mui/material/styles';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Iconify from "../../components/Iconify";



export default function SelectionTab() { 
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  return(
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Belanja" icon={<Iconify icon="mdi:cash-register" />} sx={{fontSize:12}} />
          <Tab label="Pendapatan" icon={<Iconify icon="mdi:transfer" />} sx={{fontSize:12}}/>
          <Tab label="Anggaran" icon={<Iconify icon="mdi:bank-outline"/>} sx={{fontSize:12}}/>
        </Tabs>
      </Box>
    </>
  )


}