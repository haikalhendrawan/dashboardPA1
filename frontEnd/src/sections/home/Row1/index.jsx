import {useState, useEffect} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button, Grid, Backdrop} from '@mui/material';
import {styled, useTheme, alpha} from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import useDIPA from "../useDIPA";
import NumbersCard from "./NumbersCard";
import SpendingPerAccount from "./SpendingPerAccount";
import useLoading from "../../../hooks/useLoading";

export default function Row1(){
  const theme = useTheme();
  const {isLoading, setIsLoading} = useLoading();
  const {spending, budget} = useDIPA();
  const [totalBudget, setTotalBudget] = useState();
  const [totalSpending, setTotalSpending] = useState();
  const [percentRlsd, setPercentRlsd] = useState();
  const [dateText, setDateText] = useState();
  const [yearText, setYearText] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function setTheData(){
      const allSpending = spending?await getTotal(spending):null;
      const formattedSpending = spending?await formatToTrilyun(allSpending):null;
      setTotalSpending(formattedSpending);

      const allBudget = budget?await getTotal(budget):null;
      const formattedBudget = spending?await formatToTrilyun(allBudget):null;
      setTotalBudget(formattedBudget);

      const percent = allBudget & allSpending?(allSpending/allBudget*100).toFixed(2): null;
      setPercentRlsd(`${percent} %`);

      const text = await getToday();
      setDateText(text)

      const year = new Date().getFullYear();
      setYearText(year)
    }

    let timeoutId;


    if(budget){
    setTheData();
    return(() => {clearTimeout(timeoutId)})
    }

    

  }, [budget]);


  return(
    <>

       <Grid item xs={6} sm={6} md={2}>
          <NumbersCard 
            header={`Anggaran Belanja`}
            number={totalBudget}
            footer={`DIPA ${yearText}`}
            icon={`mdi:cash-register`}
            iconColor={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={2}>
          <NumbersCard 
            header={`Realisasi Belanja`}
            number={totalSpending}
            footer={`s.d. ${dateText}`}
            icon={`mdi:transfer`}
            iconColor={theme.palette.warning.main}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={2}>
          <NumbersCard 
            header={`Persentase Realisasi `}
            number={percentRlsd}
            footer={`dari anggaran`}
            icon={`mdi:chart-timeline`}
            iconColor={theme.palette.purple.dark}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <SpendingPerAccount
            header={`Persentase Realisasi`}
            number={`32%`}
            footer={`dari total pagu`}
            icon={`mdi:chart-timeline-variant-shimmer`}
            iconColor={theme.palette.primary.main}
            spendingData = {spending}
            budgetData = {budget}
          />
        </Grid>
    </>
  )
}


async function getTotal(data){
  const filter = data?.filter((item) => {
    const account = parseInt(item.akun.slice(0,2));
    return account<60
  });
  const number = filter.reduce((a, c) => {
    const currentAmount = parseInt(c.amount);
    return a + currentAmount
  }, 0); 

 
 return number
}

async function formatToTrilyun(number){
  const output = `${(number/1000000000000).toFixed(2)} T`;
  const adjDecimal = output.replace(".", ",")

  return adjDecimal
}

async function getToday(){
  const today = new Date();
  const date = today.getDate();
  const month = today.toLocaleString("id-ID", { month: 'short' })
  const text = date + " " + month

  return text
}



