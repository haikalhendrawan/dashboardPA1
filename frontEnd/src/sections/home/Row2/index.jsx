import {useEffect, useState, useMemo} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button, Grid} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import useDIPA from "../useDIPA";
import Chart from '../../../components/Charts';
import { useChart } from '../../../components/Charts';
import Iconify from '../../../components/Iconify';
import SpendingChart from "./SpendingChart";
import AppCurrentVisits from "./AppCurrentVisits";
//----------------------------------------------------------------


export default function Row2(props){
  const theme = useTheme();
  const {spending, budget, getLast30Days, getY30Days} = useDIPA();
  const [value, setValue] = useState({
    akun51:0,
    akun52:0,
    akun53:0,
    akunOther:0,
    amount51:10,
    amount52:20,
    amount53:30,
    amountOther:40,
  });
  const [trendOption, setTrendOption] = useState(0);
  const [proportionOption, setProportionOption] = useState(0);

  const xLabel = useMemo(() => (spending ? getLast30Days(spending) : null), [spending]);
  const yValue = useMemo(() => (spending ? getY30Days(xLabel, spending) : null), [spending, xLabel]);

  const handleChangeTrend = (event) => {
    setTrendOption(event.target.value)
  };

  const handleChangeProportion = (newValue) => {
    setProportionOption(newValue);
    console.log(newValue)
  };

  useEffect(() => {
    async function render(){
      const akun51Realised = spending? await getRealization('51', spending): null;
      const akun51Budget   = budget? await getRealization('51', budget): null;
      const akun52Realised = spending? await getRealization('52', spending): null;
      const akun52Budget   = budget? await getRealization('52', budget): null;
      const akun53Realised = spending? await getRealization('53', spending): null;
      const akun53Budget   = budget? await getRealization('53', budget): null;
      const otherAkunRealised = spending? await getOtherRealization(spending): null;
      const otherAkunBudget= budget? await getOtherRealization(budget): null;

      setValue({
        akun51:akun51Budget,
        akun52:akun52Budget,
        akun53:akun53Budget,
        akunOther:otherAkunBudget,
        amount51:akun51Realised,
        amount52:akun52Realised,
        amount53:akun53Realised,
        amountOther:otherAkunRealised
      })
    }

    render();

  }, [spending, budget])

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
               popperValue={trendOption}
               changeTrend={handleChangeTrend}
            />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AppCurrentVisits
              title="Proporsi Belanja"
              subheader={`Dari Total ${proportionOption==0?'Anggaran':'Realisasi'}`}
              chartData={[
                { label: 'Belanja Pegawai (51)', value: proportionOption==1?parseInt(value.amount51):parseInt(value.akun51)},
                { label: 'Belanja Barang (52)', value: proportionOption==1?parseInt(value.amount52):parseInt(value.akun52)},
                { label: 'Belanja Modal (53)', value: proportionOption==1?parseInt(value.amount53):parseInt(value.akun53)},
                { label: 'Lainnya (54-57)', value: proportionOption==1?parseInt(value.amountOther):parseInt(value.akunOther)},
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.warning.main,
                theme.palette.success.dark,
                theme.palette.error.dark,
              ]}
              proportion={proportionOption}
              changeProportion={handleChangeProportion}
            />
        </Grid> 
    </>
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