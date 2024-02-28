import {useState, useEffect} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button, Grid} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import useDIPA from "../useDIPA";
import PercentBA from "./PercentBA";
import PerAccountTrend from "./PerAccountTrend";



export default function Row4(props){
  const theme = useTheme();

  const [option, setOption] = useState(0);

  const [perBA, setPerBA] = useState([]);

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

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if(budget && spending){
      setIsReady(true)
    }
  }, [budget, spending]);

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
                 labels: ['01/01/2023', '01/02/2023', '01/03/2023'],
                 series: [
                   {
                     name: 'Realisasi Belanja (Rp)',
                     type: 'area',
                     fill: 'gradient',
                     data: [123, 34, 455],
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

async function getTotal1Account(spending){
  
} 