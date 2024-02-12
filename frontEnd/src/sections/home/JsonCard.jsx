import {useState, useEffect} from "react";
import axios from "axios";
import {Card, CardHeader, Typography, Grid, Box, Tabs, Tab, Container, Stack} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';


export default function JsonCard(){
  const [data, setData] = useState();
  const theme = useTheme();
  useEffect(() => {
    async function getData(){
      const result = await axios.get("http://localhost:3015/getAllSpending");
      setData(result.data);
    };
    getData();
  });

  return(
    <Card>
    <CardHeader title="JSON" />
      <Box sx={{padding:5, overflow:'hidden'}}>
        <Typography>
          {`${data&&JSON.stringify(data)}`}
        </Typography>
      </Box>
    </Card>

  )
};