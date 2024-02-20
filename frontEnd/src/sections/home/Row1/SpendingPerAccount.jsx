import {useState} from "react";
import {Card, Typography, Grid, Box, Tabs, Tab, CardContent, Stack} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import Chart from '../../../components/Charts';
import { useChart } from '../../../components/Charts';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Iconify from "../../../components/Iconify";
import createPalette from "@mui/material/styles/createPalette";



export default function SpendingPerAccount(props){
  const theme = useTheme();

  const chartOptions = useChart({
    labels:[''],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [theme.palette.primary.light],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    grid: {
      padding: {
        top: -20,
        right: -20,
        bottom: -20,
        left: -20,
      }
    },
    legend: {
      show: false
    },
    plotOptions:{
      radialBar: {
        dataLabels: {
          value: {show:true, offsetY:'-5%'},
          total: {show:false},
        },
      },
    }
  });

  return(
    <Card>
      <CardContent>
        <Grid container sx={{ textAlign:'center'}}>
          <Grid item xs={12} sm={6} md={3} sx={{m:0}}>
            <Typography variant="subtitle2" >Belanja Pegawai (51)</Typography>
            <Box sx={{ pb: 1 }}>
              <Chart
                dir="ltr"
                type="radialBar"
                series={[70]}
                options={chartOptions}
                width="100%"
                height="60%"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" >Belanja Barang (52)</Typography>
            <Box sx={{ pb: 1 }}>
              <Chart
                dir="ltr"
                type="radialBar"
                series={[70]}
                options={chartOptions}
                width="100%"
                height="60%"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" >Belanja Modal (53)</Typography>
            <Box sx={{ pb: 1 }}>
              <Chart
                dir="ltr"
                type="radialBar"
                series={[70]}
                options={chartOptions}
                width="100%"
                height="60%"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" >Lainnya (54-57)</Typography>
            <Box sx={{ pb: 1 }}>
              <Chart
                dir="ltr"
                type="radialBar"
                series={[70]}
                options={chartOptions}
                width="100%"
                height="60%"
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}