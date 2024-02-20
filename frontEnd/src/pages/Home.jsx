import {useState, useEffect} from "react";
import axios from "axios";
import {Card, Typography, Grid, Container, Stack} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import Row1 from "../sections/home/Row1";
import Row2 from "../sections/home/Row2";
import Row3 from "../sections/home/Row3";
import useDIPA from "../sections/home/useDIPA.jsx";
import { sub } from "date-fns";
// --------------------------------------------------------------------------

export default function Home() { 
  const {data, getData, getLast30Days, getY30Days} = useDIPA();
  const [xAxisData, setXAxisData] = useState(null);
  const [yAxisData, setYAxisData] = useState(null);
  const [subHeadText, setSubHeadText] = useState(null);
  const [disp, setDisp] = useState(0);
  const theme = useTheme();
  

  useEffect(() => {
    getData();
  },[]);

  useEffect(() => {
    const xData = data?getLast30Days(data):[];
    setXAxisData(xData);


    const yData = data?getY30Days(xData, data):null;
    setYAxisData(yData);

    const maxValue = yData?.reduce((a, b) => Math.max(a, b)) || null;
    const minValue = yData?.reduce((a, b) => Math.min(a, b)) || null;
    const difference = Math.round(((maxValue - minValue)/minValue)*100) || null;
    setSubHeadText(`(${difference}%) dalam sebulan terakhir`);

  },[data]);

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
        <Row1 />
        <Row2 xAxisData={xAxisData} yAxisData={yAxisData} disp={disp}/>
        <Row3 />
      </Grid>
    </Container>

    </>
  )


}