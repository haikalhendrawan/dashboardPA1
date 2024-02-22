import {useState} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button, Grid} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import NumberPerUnit from "./NumberPerUnitChart";
import JsonCard from "../JsonCard";



export default function Row3(props){
  const theme = useTheme();

  return(
    <>
        <Grid item xs={12} sm={6} md={4}>
          <NumberPerUnit
            title="Realisasi Per BA"
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
          />
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