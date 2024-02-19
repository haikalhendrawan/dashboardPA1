import {useState} from "react";
import {Card, Typography, Grid, Box, Tabs, Tab, CardContent} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Iconify from "../../components/Iconify";
import createPalette from "@mui/material/styles/createPalette";


export default function SpendingTypeCard(props){
  const theme = useTheme();

  return(
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={6} md={8}>
            <Typography variant="subtitle2">{props.header}</Typography>
            <Typography variant="h3">{props.number}</Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>{props.footer}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
           
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}