import {useEffect, useState, useMemo} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button, Grid} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import useDIPA from "../useDIPA";
import Chart from '../../../components/Charts';
import { useChart } from '../../../components/Charts';
import Iconify from '../../../components/Iconify';
import SpendingTrend from "./SpendingTrend";
import SpendingProportion from "./SpendingProportion";
import { format } from "date-fns";
import useLoading from "../../../hooks/useLoading";
// ----------------------------------------------------------------

// -----------------------------------------------------------------
export default function Row2(props){
  const theme = useTheme();
  const {spending, budget} = useDIPA();
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
  const [xLabel, setXLabel] = useState({
    xDays30:[],
    xMonth:[],
    xYear:[],
  });
  const [yLabel, setYLabel] = useState({
    yDays30:[],
    yMonth:[],
    yYear:[],
  });
  const [trendOption, setTrendOption] = useState(0);
  const [proportionOption, setProportionOption] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const handleChangeTrend = (newValue) => {
    setTrendOption(newValue);
  };

  const handleChangeProportion = (newValue) => {
    setProportionOption(newValue);
  };

  useEffect(() => {
    if(budget && spending){
      setIsReady(true)
    }else{
      setIsReady(false)
    }
  }, [spending, budget])

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
      });

      const today = new Date();

      // get last 30 day data
      const todayMin30 = new Date(new Date().setDate(today.getDate()-29));
      const endDate = today; 
      const ranged30day = isReady?await getRangedData(spending, todayMin30, endDate):[];
      const x = isReady?await getXLabel(ranged30day):[];
      const y = isReady?await getYLabel(ranged30day, x):[];

      // get last month data
      const firstDateCurrMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDateCurrMonth = new Date(today.getFullYear(), today.getMonth()+1, 1) - 1;
      const rangedMonth = isReady?await getRangedData(spending, firstDateCurrMonth, lastDateCurrMonth):[];
      const x2 = isReady?await getXLabel(rangedMonth):[]
      const y2 = isReady?await getYLabel(rangedMonth, x2):[];

      // get all year data
      const firstDateCurrYear = new Date(today.getFullYear(), 0, 1);
      const lastDateCurrYear= new Date(today.getFullYear(), 11, 31);
      const rangedYear = isReady?await getRangedData(spending, firstDateCurrYear, lastDateCurrYear):[];

      const x3 = isReady?await getXLabel(rangedYear):[];
      const y3 = isReady?await getYLabel(rangedYear, x3):[];

      setXLabel({xDays30:x, xMonth:x2, xYear:x3,});
      setYLabel({yDays30:y, yMonth:y2, yYear:y3,});
    }

    if(isReady){
    render();
    };
  }, [isReady])


  return(
    <>

        <Grid item xs={12} sm={12} md={8}>
          <SpendingTrend
               key={trendOption}
               title="Tren Belanja"
               subheader={'Dalam Rupiah (Rp)'}
               chart={{
                 labels: Object.values(xLabel)[trendOption],
                 series: [
                   {
                     name: 'Realisasi Belanja (Rp)',
                     type: 'area',
                     fill: 'gradient',
                     data: Object.values(yLabel)[trendOption],
                   },
                 ],
               }}
               trend={trendOption}
               changeTrend={handleChangeTrend}
            />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SpendingProportion
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
                theme.palette.purple.dark,
                theme.palette.error.dark,
              ]}
              proportion={proportionOption}
              changeProportion={handleChangeProportion}
            />
        </Grid> 
    </>
  )
}

// ------------------------------------------------------------------------------------------

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


// get data dalam range tanggal tertentu
async function getRangedData(data, startDate, endDate){

  if(!data){return false}

  const today = new Date();

  const rangedArray = data.filter((item) => {
    const itemDate = item.date;
    return itemDate>=startDate && itemDate<=endDate
  })

  return rangedArray
}

async function getXLabel(data){

  if(!data){return false}

  let array = [];

  data.map((item) => {
    const dateString = format(item.date, "MM/dd/yyyy");
    if (array.includes(dateString) === false){array.push(dateString)}
  });

  return array
}

async function getYLabel(data, xLabel){
  if(!data){return false}

  let array = [];

  xLabel.map((item) => {
    const total = data.reduce((a, c) => {
      return format(c.date, "MM/dd/yyyy") === item ? (a + parseInt(c.amount)) : a;
    }, 0)
    array.push(total)
  });

  return array
}