import {useState, useEffect} from "react";
import axios from "axios";
import {Card, Typography, Grid, Container, Stack} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import { DipaProvider } from "../sections/home/useDIPA.jsx";
import Row1 from "../sections/home/Row1";
import Row2 from "../sections/home/Row2";
import Row3 from "../sections/home/Row3";
import useDIPA from "../sections/home/useDIPA.jsx";
import { sub } from "date-fns";
// --------------------------------------------------------------------------

export default function Home() { 


  const handleTabChange = (value) => {
    setDisp(value);
  };


  return(
    <>

      <Container maxWidth="xl">

        {/* <Stack direction="row" alignItems="center" justifyContent="center " mb={5}>
          <SelectionTab tab={disp} setTab={handleTabChange}/>
        </Stack> */}
       
        <Grid container spacing={2} sx={{mt:1}}>
          <DipaProvider>
            <Row1 />
            <Row2 />
            <Row3 />
          </DipaProvider> 
        </Grid>
      </Container>

    </>
  )


}