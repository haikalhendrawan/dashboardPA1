import {useState} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button, Grid} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import Chart from '../../../components/Charts';
import { useChart } from '../../../components/Charts';
import Iconify from '../../../components/Iconify';
import DataSelectPopper from '../DataSelectPopper';
import SpendingChart from "./SpendingChart";
import RadialChart from "./RadialChart";



export default function Row2(props){
  const theme = useTheme();

  return(
    <>
        <Grid item xs={12} sm={6} md={8}>
          <SpendingChart
               title="Tren Realisasi Belanja"
               subheader={'Dalam Milyar Rupiah (Rp)'}
               chart={{
                 labels: props.xAxisData,
                 series: [
                   {
                     name: 'Realisasi Belanja (Rp)',
                     type: 'area',
                     fill: 'gradient',
                     data: props.yAxisData,
                   },
                 ],
               }}
               style={{display:props.disp===0?"block":"none"}}
            />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RadialChart 
            title="Realisasi Pendapatan"
            subheader={'Dalam Milyar Rupiah (Rp)'}
            chart={{
              labels:['Progress'],
              series:[70]
            }}
          />
        </Grid> 
    </>
  )
}