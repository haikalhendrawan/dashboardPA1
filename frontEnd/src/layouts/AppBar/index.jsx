import {useEffect, useState} from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Iconify from "../../components/Iconify";
import InjectDataModal from "./InjectDataModal";
import ThemeSwitcher from './themeSwitcher';


export default function AppBar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateHistory, setUpdateHistory] = useState(null);

  const handleClick = () => {
    setModalOpen(true);
  };

  const modalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/getLastUpdateHistory`);
      const output = new Date(result.data[0].update_time);
      setUpdateHistory(output.getDate()+ " " + output.toLocaleString("id-ID", { month: 'short' }) +  " " + output.getFullYear());
    }
    fetchData();
  }, []);

  return (
    <>
    <Box sx={{ flexGrow: 1, borderBottom:1, borderColor:'divider', maxHeight:'70px'}} >
        <Toolbar>
          <Box sx={{height:40, width:40}}>
            <img src="/dashboard-logo.png" alt="logo" style={{height:'100%', width:'100%'}}/>
          </Box>
          
          {/* <Typography variant="h5" color='error'> Dashboard </Typography> */}

          <Box sx={{ flexGrow:1 }} />

          <ThemeSwitcher />
          <Button variant='outlined' color='primary' sx={{borderRadius:'12px'}} onClick={handleClick}>
            <Iconify icon="mdi:login" sx={{mr:1}}/>
            Data
          </Button>
        </Toolbar>
    </Box>

    <InjectDataModal open={modalOpen} close={modalClose} history={updateHistory} />
    </>
  );
}