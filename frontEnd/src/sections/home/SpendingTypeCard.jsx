import {useState} from "react";
import {Card, Typography, Grid, Box, Tabs, Tab, CardContent, Stack} from '@mui/material';
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
          <Grid item xs={12} sm={6} md={3} >
            <Typography variant="subtitle2">Belanja Pegawai</Typography>
            <Typography variant="h4">20%</Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color={theme.palette.text.secondary}>Akun</Typography>
              <Typography variant="body2" color={theme.palette.primary.main}>51</Typography>
            </Stack>

          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" >Belanja Barang</Typography>
            <Typography variant="h4">53%</Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color={theme.palette.text.secondary}>Akun</Typography>
              <Typography variant="body2" color={theme.palette.error.main}>52</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" >Belanja Modal</Typography>
            <Typography variant="h4">23%</Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color={theme.palette.text.secondary}>Akun</Typography>
              <Typography variant="body2" color={theme.palette.warning.main}>53</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" >Lainnya</Typography>
            <Typography variant="h4">54%</Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color={theme.palette.text.secondary}>Akun</Typography>
              <Typography variant="body2" color={theme.palette.success.main}>54-59</Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}