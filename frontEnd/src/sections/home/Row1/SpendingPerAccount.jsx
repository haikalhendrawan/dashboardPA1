import {useState, useEffect} from "react";
import {Card, Typography, Grid, Box, Tabs, Tab, CardContent, Stack} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import Chart from '../../../components/Charts';
import { useChart } from '../../../components/Charts';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Iconify from "../../../components/Iconify";
import RadialChart from "./RadialChart";
// -----------------------------------------------

export default function SpendingPerAccount({spendingData, budgetData}){
  const theme = useTheme();
  const [value, setValue] = useState({
    akun51:0,
    akun52:0,
    akun53:0,
    akunOther:0,
    amount51:``,
    amount52:'',
    amount53:'',
    amountOther:'',
  });

  useEffect(() => {
    async function renderText(){
      const akun51Realised = spendingData? await getRealization('51', spendingData): null;
      const akun51Budget   = budgetData? await getRealization('51', budgetData): null;
      const akun52Realised = spendingData? await getRealization('52', spendingData): null;
      const akun52Budget   = budgetData? await getRealization('52', budgetData): null;
      const akun53Realised = spendingData? await getRealization('53', spendingData): null;
      const akun53Budget   = budgetData? await getRealization('53', budgetData): null;
      const otherAkunRealised = spendingData? await getOtherRealization(spendingData): null;
      const otherAkunBudget= budgetData? await getOtherRealization(budgetData): null;

      const percent51 = (akun51Realised/akun51Budget*100).toFixed(1);
      const percent52 = (akun52Realised/akun52Budget*100).toFixed(1);
      const percent53 = (akun53Realised/akun53Budget*100).toFixed(1);
      const percentOther = (otherAkunRealised/otherAkunBudget*100).toFixed(1)

      const number51 = await formatToMilyar(akun51Realised);
      const number52 = await formatToMilyar(akun52Realised);
      const number53 = await formatToMilyar(akun53Realised);
      const numberOther = await formatToMilyar(otherAkunRealised);


      setValue({
        akun51:percent51,
        akun52:percent52,
        akun53:percent53,
        akunOther:percentOther,
        amount51:number51,
        amount52:number52,
        amount53:number53,
        amountOther:numberOther
      })
    }

    renderText();

  }, [spendingData, budgetData])

  return(
    <Card>
      <CardContent sx={{mb:-2}}>
        <Grid container sx={{ textAlign:'center'}}>
          <Grid item xs={12} sm={6} md={3} sx={{m:0}}>
            <Typography variant="subtitle2" >Belanja Pegawai (51)</Typography>
            <RadialChart 
              chart={{
                labels:[value.amount51],
                colors:theme.palette.primary.main, 
                toColor:theme.palette.primary.light, 
                series:[value.akun51]
                }} 
              />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" >Belanja Barang (52)</Typography>
            <RadialChart 
              chart={{
                labels:[value.amount52] ,
                colors:theme.palette.warning.main,
                toColor:theme.palette.warning.light,  
                series:[value.akun52]
                }} 
              />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" >Belanja Modal (53)</Typography>
            <RadialChart 
              chart={{
                labels:[value.amount53],
                colors:theme.palette.purple.darker,
                toColor:theme.palette.purple.dark,  
                series:[value.akun53]
                }} 
              />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" >Lainnya (54-57)</Typography>
            <RadialChart 
              chart={{
                labels:[value.amountOther] ,
                colors:theme.palette.warning.main,
                toColor:theme.palette.warning.light,  
                series:[value.akunOther]
                }} 
              />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}


async function getRealization(account, data){
  const filter = data?.filter((item) => {
    return item.akun.slice(0,2)===account
  });
  const sum = filter.reduce((a, c) => {
    return a + parseInt(c.amount)
  }, 0);

  return sum
};

async function getOtherRealization(data){
  const filter = data?.filter((item) => {
    const account = parseInt(item.akun.slice(0,2));
    return account>53 && account<60
  });
  const sum = filter.reduce((a, c) => {
    return a + parseInt(c.amount)
  }, 0);

  return sum
};

async function formatToMilyar(number){
  const output = `${(number/1000000000).toFixed(1)} M`;
  const adjDecimal = output.replace(".", ",");

  return adjDecimal
};
