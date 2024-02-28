import {useState, useEffect} from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import { Card, CardHeader, Box, Button, Grid} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import {format} from "date-fns";
import useDIPA from "../useDIPA";
import PercentBA from "./PercentBA";
import PerAccountTrend from "./PerAccountTrend";

// ----------------------------------------------------------

export default function Row4(props){
  const theme = useTheme();

  const [option, setOption] = useState(0);

  const [perBA, setPerBA] = useState([]);

  const [perAccount, setPerAccount] = useState([]);

  const [chartData, setChartData] = useState([]);

  const {spending, budget} = useDIPA();

  const [accountOption, setAccountOption] = useState(0);

  const handleChangeOption= async(newValue) => {
    setOption(newValue)
    const arr = await orderAndSort(perBA, newValue);
    setChartData(arr);
  };

  const handleChangeAccount = async(newValue) => {
    setAccountOption(newValue);
  };

  const [xLabel, setXLabel] = useState(null);

  const [yLabel, setYLabel] = useState(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if(budget && spending && xLabel && yLabel){
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
      const log = await getLast30Day(result.data, '511219');
      const allDate = log.map((item) => {
        const date = item.tanggal.split("/")[0];
        const month = item.tanggal.split("/")[1];
        const year = item.tanggal.split("/")[2];
        return month+"/"+date+"/"+year
      });
      setXLabel(allDate)
      console.log(allDate)
      const allValues = log.map((item) => {return item.total});
      setYLabel(allValues)
      console.log(allValues)
    };

    getPerAccount()
  }, []);

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

async function getLast30Day(spending, account){
  
  const output = spending.filter((item) => {
    const today = new Date();
    const todayMin30 = new Date(new Date().setDate(today.getDate()-29));
    const endDate = today;
    const itemDate = new Date(item.date);

    return itemDate>=todayMin30 && itemDate<=endDate && item.akun===account
  }).toSorted((a, b) => {
    return a.date = b.date
  })

  return output
} 