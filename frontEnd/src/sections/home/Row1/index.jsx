import {useState} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button, Grid} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import Chart from '../../../components/Charts';
import { useChart } from '../../../components/Charts';
import Iconify from '../../../components/Iconify';
import DataSelectPopper from '../DataSelectPopper';
import NumbersCard from "./NumbersCard";
import SpendingPerAccount from "./SpendingPerAccount";


export default function Row1(){
  const theme = useTheme();

  return(
    <>
       <Grid item xs={6} sm={6} md={2}>
          <NumbersCard 
            header={`Anggaran Belanja`}
            number={`5,6 T`}
            footer={`DIPA 2024`}
            icon={`mdi:cash-register`}
            iconColor={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={2}>
          <NumbersCard 
            header={`Realisasi Belanja`}
            number={`2,3 T`}
            footer={`s.d. 19 Februari`}
            icon={`mdi:transfer`}
            iconColor={theme.palette.warning.main}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={2}>
          <NumbersCard 
            header={`Persentase Realisasi `}
            number={`32%`}
            footer={`dari pagu`}
            icon={`mdi:chart-timeline-variant-shimmer`}
            iconColor={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <SpendingPerAccount
            header={`Persentase Realisasi`}
            number={`32%`}
            footer={`dari total pagu`}
            icon={`mdi:chart-timeline-variant-shimmer`}
            iconColor={theme.palette.primary.main}
          />
        </Grid>
    </>
  )
}