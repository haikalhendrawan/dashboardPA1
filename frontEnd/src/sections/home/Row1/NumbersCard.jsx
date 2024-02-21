import {useState} from "react";
import {Card, Typography, Grid, Box, Tabs, Tab, CardContent, Stack} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Iconify from "../../../components/Iconify";
import createPalette from "@mui/material/styles/createPalette";


export default function NumbersCard(props){
  const theme = useTheme();

  return(
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={6} md={8}>
            <Stack direction='column' spacing={1}>
              <Typography variant="subtitle2">{props.header}</Typography>
              <Typography variant="h4">{props.number}</Typography>
              <Typography variant="body2" color={theme.palette.text.secondary}>{props.footer}</Typography>
            </Stack>

          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Iconify icon={props.icon} sx={{width:'100%', height:'100%', color:props.iconColor}}/>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}