import {useState, useEffect} from "react";
import axios from "axios";
import {Card, Typography, Grid, Container, Stack, Backdrop, Button, Box} from '@mui/material';
import {styled, useTheme, alpha} from '@mui/material/styles';
import { DipaProvider } from "../sections/home/useDIPA.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import PuffLoader from "react-spinners/PuffLoader";
import Row1 from "../sections/home/Row1";
import Row2 from "../sections/home/Row2";
import Row3 from "../sections/home/Row3";
import Row4 from "../sections/home/Row4";
import useLoading from "../hooks/useLoading.jsx"

// --------------------------------------------------------------------------

export default function Home() { 
  const {isLoading, setIsLoading} = useLoading();
  const theme = useTheme();
  
  const handleClose = () => {
    setIsLoading(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleTabChange = (value) => {
    setDisp(value);
  };

  return(
    <>
      <Container maxWidth="xl">
        <Backdrop
          sx={{ color: '#f7f9fc', zIndex:9999, backgroundColor: alpha(theme.palette.grey[800], 0.8)}}
          open={isLoading}
          onClick={handleClose}
        >
          <div style ={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <PuffLoader 
              color={'blue'}  
              sx={{ justifyContent: 'center', alignItems: 'center' }} 
              speedMultiplier={0.7}
              />
            <Typography variant="body2">Loading</Typography>
          </div>
        </Backdrop>
        {/* <Stack direction="row" alignItems="center" justifyContent="center " mb={5}>
          <SelectionTab tab={disp} setTab={handleTabChange}/>
        </Stack> */}
       
        <Grid container spacing={2} sx={{mt:1}}>
            <Row1 />
            <Row2 />
            <Row3 />
            <Row4 />
        </Grid>
      </Container>

    </>
  )


}