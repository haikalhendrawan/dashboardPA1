import {useState} from "react";
import {Card, Typography, Grid, Box, Tabs, Tab, CardContent, Stack} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import Chart from '../../../components/Charts';
import { useChart } from '../../../components/Charts';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Iconify from "../../../components/Iconify";
import RadialChart from "./RadialChart";
// -----------------------------------------------

export default function SpendingPerAccount(props){
  const theme = useTheme();
  return(
    <Card>
      <CardContent sx={{mb:-2}}>
        <Grid container sx={{ textAlign:'center'}}>
          <Grid item xs={12} sm={6} md={3} sx={{m:0}}>
            <Typography variant="subtitle2" >Belanja Pegawai (51)</Typography>
            <RadialChart 
              chart={{
                labels:[''] ,
                colors:theme.palette.primary.main, 
                toColor:theme.palette.primary.light, 
                series:['74']
                }} 
              />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" >Belanja Barang (52)</Typography>
            <RadialChart 
              chart={{
                labels:[''] ,
                colors:theme.palette.warning.main,
                toColor:theme.palette.warning.light,  
                series:['33']
                }} 
              />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" >Belanja Modal (53)</Typography>
            <RadialChart 
              chart={{
                labels:['25,2 M'],
                colors:theme.palette.primary.main,
                toColor:theme.palette.primary.light,  
                series:[45]
                }} 
              />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" >Lainnya (54-57)</Typography>
            <RadialChart 
              chart={{
                labels:[''] ,
                colors:theme.palette.warning.main,
                toColor:theme.palette.warning.light,  
                series:['61']
                }} 
              />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}