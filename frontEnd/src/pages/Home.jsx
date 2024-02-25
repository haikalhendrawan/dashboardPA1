import {useState, useEffect} from "react";
import axios from "axios";
import {Card, Typography, Grid, Container, Stack, Backdrop, Button, Box} from '@mui/material';
import {styled, useTheme, alpha} from '@mui/material/styles';
import { DipaProvider } from "../sections/home/useDIPA.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Row1 from "../sections/home/Row1";
import Row2 from "../sections/home/Row2";
import Row3 from "../sections/home/Row3";
import useDIPA from "../sections/home/useDIPA.jsx";
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
          sx={{ color: '#f7f9fc', zIndex:9999, backgroundColor: alpha(theme.palette.grey[300], 0.8)}}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="primary" />
        </Backdrop>
        {/* <Stack direction="row" alignItems="center" justifyContent="center " mb={5}>
          <SelectionTab tab={disp} setTab={handleTabChange}/>
        </Stack> */}
       
        <Grid container spacing={2} sx={{mt:1}}>
            <Row1 />
            <Row2 />
            <Row3 />
        </Grid>
      </Container>

    </>
  )


}