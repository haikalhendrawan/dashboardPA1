import {useState, useEffect} from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import { Card, CardHeader, Box, Button, Grid} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import {format} from "date-fns";
import useDIPA from "../useDIPA";
import PercentBA from "./PercentBA";
import PerAccountTrend from "./PerAccountTrend";
import Scrollbar from "../../../components/Scrollbar";

// ----------------------------------------------------------

export default function Row4(props){
  const theme = useTheme();

  const [option, setOption] = useState(0);

  const [perBA, setPerBA] = useState([]);

  const [perAccount, setPerAccount] = useState([]);

  const [account, setAccount] = useState('511111');

  const [allAcc, setAllAcc] = useState([]);

  const [chartData, setChartData] = useState([]);

  const {spending, budget} = useDIPA();

  const [accountOption, setAccountOption] = useState(0);

  const handleChangeOption= async(newValue) => {
    setOption(newValue)
    const arr = await orderAndSort(perBA, newValue);
    setChartData(arr);
  };

  const [xLabel, setXLabel] = useState(null);

  const [yLabel, setYLabel] = useState(null);

  const [isReady, setIsReady] = useState(false);

  const handleChangeAccount = async(newValue) => {
    setAccountOption(newValue);
    if(parseInt(newValue)===0){await setLast30Days(perAccount)}
    if(parseInt(newValue)===1){await setLastMonth(perAccount)}
    if(parseInt(newValue)===2){await setAllYear(perAccount)}
  };

  useEffect(() => {
    if(budget && spending && xLabel && yLabel ){
      setIsReady(true)
    };
  }, [budget, spending, xLabel, yLabel]);

  useEffect(() => {
    async function render(){
      // chart realisasi per BA
      const array = await getTotalPerBA(spending, budget);
      const array2 = await orderAndSort(array, option);
      setPerBA(array);
      setChartData(array2);
    }

    if(isReady){
      render();
    };

  }, [isReady]);

  useEffect(() => {
    async function getPerAccount(){
      // chart trend akun
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/getAccountTrend`); 
      setPerAccount(result.data);  
      await setLast30Days(result.data);
      const allAkun = await getAllAccount(result.data);
      setAllAcc(allAkun);
    };
    getPerAccount()
  }, []);

  async function setLast30Days(data){
    const {startDate, endDate} = await last30Day();
    const row = await getRange(data, '511111', startDate, endDate);
    const x = await getXLabel(row);
    setXLabel(x)
    const y = await getYLabel(row);
    setYLabel(y);
  }

  async function setLastMonth(data){
    const {startDate, endDate} = await lastMonth();
    const row = await getRange(data, '511111', startDate, endDate);
    const x = await getXLabel(row);
    setXLabel(x)
    const y = await getYLabel(row);
    setYLabel(y);
  }

  async function setAllYear(data){
    const {startDate, endDate} = await allYear();
    const row = await getRange(data, '511111', startDate, endDate);
    const x = await getXLabel(row);
    setXLabel(x)
    const y = await getYLabel(row);
    setYLabel(y);
  }

  return(
    <>
        <Grid item xs={12} sm={6} md={4}>
          <PercentBA
            title="Belanja Per BA"
            subheader="persen (%) realisasi belanja"
            chartData={chartData}
            option={option}
            colors={theme.palette.warning.main}
            handleChange={handleChangeOption}
          />
        </Grid> 
        <Grid item xs={12} sm={6} md={8}>
          <PerAccountTrend
              key={accountOption}
              title="Tren Belanja"
              subheader={'Dalam Rupiah (Rp)'}
              chart={{
                labels: xLabel,
                series: [
                  {
                    name: 'Realisasi Belanja (Rp)',
                    type: 'area',
                    fill: 'gradient',
                    data: yLabel,
                  },
                ],
              }}
              trend={accountOption}
              changeTrend={handleChangeAccount}
              account={account}
          /> 
        </Grid> 
    </>
  )
}

// ----------------------------------------------------------
async function getTotalPerBA(spending, budget){
  const allBA= [];

  await spending.map((item) => { // array semua nama BA
    if(allBA.includes(item.uraianba)===false){
      item.uraianba!==null?allBA.push(item.uraianba):null
    }
  });

  const spendingPerBA = allBA.map((item) => { // array total amount per BA
    return spending.reduce((a, c) => {
      return c.uraianba===item?a + parseInt(c.amount) : a
    }, 0)
  });

  const budgetPerBA = allBA.map((item) => { // array total amount 
    return budget.reduce((a, c) => {
      return c.uraianba===item?a + parseInt(c.amount) : a
    }, 0)
  });

  const output = allBA.map((item, index) => { // array nama BA + total amount
    return (
      {
      label:item, 
      value:((parseInt(spendingPerBA[index])/parseInt(budgetPerBA[index])))*100, 
      spending:parseInt(spendingPerBA[index]),
      budget:parseInt(budgetPerBA[index])})
      }
    );
  
  const sortedOutput = output.sort((a, b) => {
    return parseInt(b.value) - parseInt(a.value)
  });
  

  return sortedOutput
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


// @perAccount data format 
//   akun:String
//   total:String
//   tanggal:String
//   nmakun:String
//   date:Date

async function getRange(spending, account, startDate, endDate){
  const output = spending.filter((item) => {
    const itemDate = new Date(item.date)
    return itemDate>=startDate && itemDate<=endDate && item.akun===account
  }).toSorted((a, b) => {
    return a.date - b.date
  })

  return output
} 


async function getXLabel(data){
  const x = data.map((item) => {
    const dateString = format(item.date, "MM/dd/yyyy");
    return dateString
  });

  return x
}

async function getYLabel(data){
  const y = data.map((item) => {return item.total});

  return y
}

async function last30Day(){
  const today = new Date();
  const startDate = new Date(new Date().setDate(today.getDate()-29));
  const endDate = today;

  return {startDate, endDate}
}

async function lastMonth(){
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 1, 1);
  const endDate = new Date(today.getFullYear(), 1, 29);

  return {startDate, endDate}
}

async function allYear(){
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);
  const endDate = new Date(today.getFullYear(), 11, 31);

  return{startDate, endDate}
}

async function getAllAccount(data){
  const array = [];

  data.map((item) => {
    array.includes(item.akun) ? null : array.push(item.akun)
  })

  return array.toSorted()
}