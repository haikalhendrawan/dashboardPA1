import {useState, useEffect} from "react";
import axios from "axios";
import {Card, Typography, Grid, Box, Tabs, Tab, Container, Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import WebsiteVisits from "../sections/home/WebsiteVisit.jsx";
import SelectionTab from "../sections/home/selectionTab.jsx";

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
      <Grid >
        <Stack direction="row" alignItems="center" justifyContent="center " mb={5}>
          <SelectionTab />
        </Stack>

        <Typography>
          {`${data&&JSON.stringify(data)}`}
        </Typography>
        
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