import {useState, useEffect} from "react";
import axios from "axios";
import {Card, Typography, Grid, Box, Tabs, Tab, Container, Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import WebsiteVisits from "../sections/home/WebsiteVisit.jsx";
import SelectionTab from "../sections/home/selectionTab.jsx";
import JsonCard from "../sections/home/jsonCard.jsx";

export default function Home() { 
  const [data, setData] = useState();

  useEffect(() => {
    async function getData(){
      const result = await axios.get("http://localhost:3015/getAllSpending");
      setData(result.data);
    };
    getData();
  },[])

  return(
    <Container maxWidth="xl">

      <Stack direction="row" alignItems="center" justifyContent="center " mb={5}>
        <SelectionTab />
      </Stack>

      <Grid container >
        <Grid item xs={6} md={6} lg={6} >
          <WebsiteVisits
               title="Website Visits"
               subheader="(+43%) than last year"
               chart={{
                 labels: [
                   '01/01/2003',
                   '02/01/2003',
                   '03/01/2003',
                   '04/01/2003',
                   '05/01/2003',
                   '06/01/2003',
                   '07/01/2003',
                   '08/01/2003',
                   '09/01/2003',
                   '10/01/2003',
                   '11/01/2003',
                 ],
                 series: [
                   {
                     name: 'Team A',
                     type: 'column',
                     fill: 'solid',
                     data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                   },
                   {
                     name: 'Team B',
                     type: 'area',
                     fill: 'gradient',
                     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                   },
                   {
                     name: 'Team C',
                     type: 'line',
                     fill: 'solid',
                     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                   },
                 ],
               }}
            />
        </Grid>
        <Grid item xs={6} md={6} lg={6} >
          <JsonCard />
        </Grid> 
      </Grid>
    </Container>
  )


}