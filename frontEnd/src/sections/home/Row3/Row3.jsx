import {useState, useEffect, useMemo} from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import { Card, CardHeader, Box, Button, Grid, Skeleton} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import useDIPA from "../useDIPA";
import PerSpendingTrend from "./PerSpendingTrend";
import PercentSatker from "./PercentSatker";
import { format, setISODay } from "date-fns";
import useLoading from "../../../hooks/useLoading";
// ----------------------------------------------------------------------------


export default function Row3(props){
  const theme = useTheme();
  const {isLoading, setIsLoading} = useLoading();
  const {spending, budget} = useDIPA();
  const [perSatker, setPerSatker] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [top10Option, setTop10Option] = useState(0);
  const [xLabel, setXLabel] = useState({
    xDays30:[],
    xMonth:[],
    xYear:[],
  });
  const [yLabel51, setYLabel51] = useState({
    yDays30:[], yMonth:[], yYear:[],
  });
  const [yLabel52, setYLabel52] = useState({
    yDays30:[], yMonth:[], yYear:[],
  });
  const [yLabel53, setYLabel53] = useState({
    yDays30:[], yMonth:[], yYear:[],
  });
  const [trendOption, setTrendOption] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if(budget && spending){setIsReady(true); setIsLoading(false)}
    else{setIsReady(false); setIsLoading(true)}
  }, [budget, spending]);

  useEffect(() => {
    async function render(){
      // chart realisasi per satker
      const arr = await getTotalPerSatker(spending, budget);
      const arr2 = await orderAndSort(arr, top10Option);
      setPerSatker(arr);
      setChartData(arr2);

      const result = await axios.get(`${import.meta.env.VITE_API_URL}/getAllSpending50`);
      const {x, x2, x3, y51, y52, y53, y251, y252, y253, y351, y352, y353} = result.data;

      // // chart tren per jenis belanja
      // const today = new Date();

      // // get last 30 day data
      // const todayMin30 = new Date(new Date().setDate(today.getDate()-29));
      // const endDate = today; 
      // const ranged30day = await getRangedData(spending, todayMin30, endDate);
      // const x = await getXLabel(ranged30day);
      // const y51 = await getYLabel(ranged30day, x, 51) ;
      // const y52 = await getYLabel(ranged30day, x, 52);
      // const y53 = await getYLabel(ranged30day, x, 53);

      // // get last month data
      // const firstDateCurrMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      // const lastDateCurrMonth = new Date(today.getFullYear(), today.getMonth()+1, 1) - 1;
      // const rangedMonth = await getRangedData(spending, firstDateCurrMonth, lastDateCurrMonth);
      // const x2 = await getXLabel(rangedMonth)
      // const y251 = await getYLabel(rangedMonth, x2, 51);
      // const y252 = await getYLabel(rangedMonth, x2, 52);
      // const y253 = await getYLabel(rangedMonth, x2, 53);

      // // get all year data
      // const firstDateCurrYear = new Date(today.getFullYear(), 0, 1);
      // const lastDateCurrYear= new Date(today.getFullYear(), 11, 31);
      // const rangedYear = await getRangedData(spending, firstDateCurrYear, lastDateCurrYear);

      // const x3 = await getXLabel(rangedYear);
      // const y351 = await getYLabel(rangedYear, x3, 51);
      // const y352 = await getYLabel(rangedYear, x3, 52);
      // const y353 = await getYLabel(rangedYear, x3, 53);

      setXLabel({xDays30:x, xMonth:x2, xYear:x3,});
      setYLabel51({yDays30:y51, yMonth:y251, yYear:y351});
      setYLabel52({yDays30:y52, yMonth:y252, yYear:y352});
      setYLabel53({yDays30:y53, yMonth:y253, yYear:y353});
    }

    if(isReady){
    console.log('render')
    render();
    };

  }, [isReady])

  const handleChange10Satker = async(newValue) => {
    setTop10Option(newValue)
    const arr = await orderAndSort(perSatker, newValue);
    setChartData(arr);
  };

  const handleChangeTrend = (newValue) => {
    setTrendOption(newValue);
  };

  return(
    <>
        <Grid item xs={12} sm={12} md={8}>
              <PerSpendingTrend
               key={trendOption}
               title="Tren Per Jenis Belanja"
               subheader={'Dalam Rupiah (Rp)'}
               chart={{
                 labels: Object.values(xLabel)[trendOption],
                 series: [
                   {
                     name: '51',
                     type: 'area',
                     fill: 'gradient',
                     data: Object.values(yLabel51)[trendOption], 
                   },
                   {
                     name: '52',
                     type: 'area',
                     fill: 'gradient',
                     data: Object.values(yLabel52)[trendOption], 
                   },
                   {
                     name: '53',
                     type: 'area',
                     fill: 'gradient',
                     data: Object.values(yLabel53)[trendOption], 
                   },
                 ],
               }}
               trend={trendOption}
               changeTrend={handleChangeTrend}
               yLabel51={yLabel51}
              />
        </Grid> 
        <Grid item xs={12} sm={12} md={4}>
          <PercentSatker
            title="Belanja Per Satker"
            subheader="Persen (%) realisasi belanja"
            chartData={chartData}
            top10Satker={top10Option}
            handleChange={handleChange10Satker}
          />
        </Grid>
    </>
  )
}

// ----------------------------------------------------------

async function getTotalPerSatker(spending, budget){
  const allSatker = [];

  await spending.map((item) => { // array semua nama satker
    if(allSatker.includes(item.nmsatker)===false){
      allSatker.push(item.nmsatker)
    }
  });

  const spendingPerSatker = allSatker.map((item) => { // array total amount 
    return spending.reduce((a, c) => {
      return c.nmsatker===item?a + parseInt(c.amount) : a
    }, 0)
  });

  const budgetPerSatker = allSatker.map((item) => { // array total amount 
    return budget.reduce((a, c) => {
      return c.nmsatker===item?a + parseInt(c.amount) : a
    }, 0)
  });

  const output = allSatker.map((item, index) => { // array nama satker + total amount
    return (
      {
      label:item, 
      value:((parseInt(spendingPerSatker[index])/parseInt(budgetPerSatker[index])))*100, 
      spending:parseInt(spendingPerSatker[index]),
      budget:parseInt(budgetPerSatker[index])})
  });
  
  const output2 = output.sort((a, b) => {
    return parseInt(b.value) - parseInt(a.value)
  });
  

  return output2
}

async function orderAndSort(data, value){
  let output = [];

  if(value==2){ // median
    output = data?.toSorted((a, b) => {return b.value-a.value}).slice((Math.round((data.length)/2)-10), (Math.round((data.length))/2));
  }else if(value==1){ // ascending
    output = data?.toSorted((a, b) => {return a.value-b.value}).slice(0, 10);
  }else{ // descending
    output = data?.toSorted((a, b) => {return b.value-a.value}).slice(0, 10);
  }
  return output

}

// get data dalam range tanggal tertentu
// async function getRangedData(data, startDate, endDate){

//   if(!data){return false}

//   const today = new Date();
//   const currentMonth = today.getMonth();
//   const currentYear = today.getFullYear();

//   const rangedArray = data.filter((item) => {
//     const itemDate = item.date;
//     return itemDate>=startDate && itemDate<=endDate 
//   })

//   return rangedArray
// }

// async function getXLabel(data){

//   if(!data){return false}

//   let array = [];

//   data.map((item) => {
//     const dateString = format(item.date, "MM/dd/yyyy");
//     if (array.includes(dateString) === false){array.push(dateString)}
//   });

//   return array
// }

// async function getYLabel(data, xLabel, akun){
//   if(!data){return false}

//   let array = [];

//   xLabel.map((item) => {
//     const total = data.reduce((a, c) => {
//       const itemAkun = parseInt(c.akun.slice(0,2));
//       return format(c.date, "MM/dd/yyyy") === item && itemAkun===akun? (a + parseInt(c.amount)) : a;
//     }, 0)
//     array.push(total)
//   });

//   return array
// }