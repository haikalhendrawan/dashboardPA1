import {useEffect, useState, useMemo} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button, Grid} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import useDIPA from "../useDIPA";
import Chart from '../../../components/Charts';
import { useChart } from '../../../components/Charts';
import Iconify from '../../../components/Iconify';
import DataSelectPopper from '../DataSelectPopper';
import SpendingChart from "./SpendingChart";
import RadialChart from "./RadialChart";
import AppCurrentVisits from "./AppCurrentVisits";
//----------------------------------------------------------------


export default function Row2(props){
  const theme = useTheme();
  const {spending, budget, getLast30Days, getY30Days} = useDIPA();
  const xLabel = useMemo(() => (spending ? getLast30Days(spending) : null), [spending]);

  const yValue = useMemo(() => (spending ? getY30Days(xLabel, spending) : null), [spending, xLabel]);


  return(
    <>
        <Grid item xs={12} sm={6} md={8}>
          <SpendingChart
               title="Tren Realisasi Belanja"
               subheader={'Dalam Rupiah (Rp)'}
               chart={{
                 labels: xLabel && xLabel,
                 series: [
                   {
                     name: 'Realisasi Belanja (Rp)',
                     type: 'area',
                     fill: 'gradient',
                     data: yValue && yValue,
                   },
                 ],
               }}
              //  style={{display:props.disp===0?"block":"none"}}
            />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AppCurrentVisits
              title="Proporsi Belanja"
              subheader={'Dalam Milyar Rupiah (Rp)'}
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.warning.main,
                theme.palette.warning.dark,
                theme.palette.primary.dark,
                
              ]}
            />
        </Grid> 
    </>
  )
}