import {useState} from "react";
import {Card, Typography, Grid, Box, Tabs, Tab, Container, Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import WebsiteVisits from "../sections/home/WebsiteVisit.jsx";
import SelectionTab from "../sections/home/selectionTab.jsx";

export default function Home() { 

  return(
    <Container maxWidth="xl">
      <Grid >
        <Stack direction="row" alignItems="center" justifyContent="center " mb={5}>
          <SelectionTab />
        </Stack>
        
        <WebsiteVisits 
            title = "Chart" 
            subheader = "subchart"
            chartColors={[
              'white',
              'blue',
              'black',
              'yellow',
            ]} 
            chartData={[
              { label: 'America', value: 4344 },
              { label: 'Asia', value: 5435 },
              { label: 'Europe', value: 1443 },
              { label: 'Africa', value: 4443 },
            ]}
          />
          
        </Grid>
    </Container>
  )


}