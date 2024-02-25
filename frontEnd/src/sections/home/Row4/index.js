import {useState, useEffect} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button, Grid} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import useDIPA from "../useDIPA";
import NumberPerUnit from "./NumberPerUnitChart";
import JsonCard from "../JsonCard";



export default function Row4(props){
  const theme = useTheme();

  return(
    <>
        <Grid item xs={12} sm={6} md={4}>
          <JsonCard />
        </Grid> 
        <Grid item xs={12} sm={6} md={4}>
          <NumberPerUnit
            title="Realisasi Per Satker"
            subheader="(+43%) than last year"
            chartData={[
              { label: 'United Kingdom', value: 1380 },
              { label: 'United States', value: 1200 },
              { label: 'Netherlands', value: 1100 },
              { label: 'South Korea', value: 690 },
              { label: 'Germany', value: 580 },
              { label: 'France', value: 540 },
              { label: 'Canada', value: 470 },
              { label: 'China', value: 448 },
              { label: 'Japan', value: 430 },
              { label: 'Italy', value: 400 },
            ]}
            colors={theme.palette.warning.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <JsonCard />
        </Grid> 
    </>
  )
}

// ----------------------------------------------------------

async function getTotalPerSatker(spending, budget){
  const allSatker = [];

  await spending.map((item) => { // array semua nama satker
    if(allSatker.includes(item.nmsatker)===false){
      allSatker.push(item.nmsatker)
    }
  });

  const spendingPerSatker = allSatker.map((item) => { // array total amount 
    return spending.reduce((a, c) => {
      return c.nmsatker===item?a + parseInt(c.amount) : a
    }, 0)
  });

  const budgetPerSatker = allSatker.map((item) => { // array total amount 
    return budget.reduce((a, c) => {
      return c.nmsatker===item?a + parseInt(c.amount) : a
    }, 0)
  });

  const output = allSatker.map((item, index) => { // array nama satker + total amount
    return (
      {
      label:item, 
      value:((parseInt(spendingPerSatker[index])/parseInt(budgetPerSatker[index])))*100, 
      spending:parseInt(spendingPerSatker[index]),
      budget:parseInt(budgetPerSatker[index])})
  });
  
  const output2 = output.sort((a, b) => {
    return parseInt(b.value) - parseInt(a.value)
  });
  

  return output2
}