import {useState, useEffect} from "react";
import axios from "axios";
import {Card, Typography, Grid, Container, Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import WebsiteVisits from "../sections/home/WebsiteVisit.jsx";
import SelectionTab from "../sections/home/selectionTab.jsx";
import JsonCard from "../sections/home/jsonCard.jsx";
import useDIPA from "../sections/home/useDIPA.jsx";

export default function Home() { 
  const {data, getData, getLast30Days, getY30Days} = useDIPA();
  const [xAxisData, setXAxisData] = useState(null);
  const [yAxisData, setYAxisData] = useState(null);

  useEffect(() => {
    getData();
  },[]);

  useEffect(() => {
    const xData = data?getLast30Days(data):[];
    setXAxisData(xData);

    const yData = data?getY30Days(xData, data):[];
    setYAxisData(yData);

    console.log(getY30Days(xData, data))
  },[data]);

  return(
    <Container maxWidth="xl">

      <Stack direction="row" alignItems="center" justifyContent="center " mb={5}>
        <SelectionTab />
      </Stack>

      <Grid container spacing={1}>
        <Grid item xs={6} md={6} lg={7} >
          <WebsiteVisits
               title="Realisasi Belanja"
               subheader="(+43%) dalam sebulan terakhir"
               chart={{
                 labels: xAxisData,
                 series: [
                   {
                     name: 'Realisasi Belanja (Rp)',
                     type: 'area',
                     fill: 'gradient',
                     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 44, 55, 41, 67, 22, 43, 21, 41, 56,  21, 41, 56,  21, 41, 56, 21, 83, 23, 42],
                   },
                   {
                     name: 'Realisasi',
                     type: 'line',
                     fill: 'solid',
                     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 30,  21, 41, 56, 54, 32, 11, 23],
                   },
                 ],
               }}
            />
        </Grid>
        <Grid item xs={6} md={6} lg={5} >
          <JsonCard />
        </Grid> 
      </Grid>
    </Container>
  )


}