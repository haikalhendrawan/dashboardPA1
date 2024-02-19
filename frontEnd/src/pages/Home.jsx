import {useState, useEffect} from "react";
import axios from "axios";
import {Card, Typography, Grid, Container, Stack} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import SpendingChart from "../sections/home/SpendingChart.jsx";
import RevenueChart from "../sections/home/RevenueChart.jsx";
import SelectionTab from "../sections/home/selectionTab.jsx";
import JsonCard from "../sections/home/jsonCard.jsx";
import NumbersCard from "../sections/home/NumbersCard.jsx";
import SpendingTypeCard from "../sections/home/SpendingTypeCard.jsx";
import useDIPA from "../sections/home/useDIPA.jsx";
import { sub } from "date-fns";
// --------------------------------------------------------------------------

export default function Home() { 
  const {data, getData, getLast30Days, getY30Days} = useDIPA();
  const [xAxisData, setXAxisData] = useState(null);
  const [yAxisData, setYAxisData] = useState(null);
  const [subHeadText, setSubHeadText] = useState(null);
  const [disp, setDisp] = useState(0);
  const theme = useTheme();
  

  useEffect(() => {
    getData();
  },[]);

  useEffect(() => {
    const xData = data?getLast30Days(data):[];
    setXAxisData(xData);


    const yData = data?getY30Days(xData, data):null;
    setYAxisData(yData);

    const maxValue = yData?.reduce((a, b) => Math.max(a, b)) || null;
    const minValue = yData?.reduce((a, b) => Math.min(a, b)) || null;
    const difference = Math.round(((maxValue - minValue)/minValue)*100) || null;
    setSubHeadText(`(${difference}%) dalam sebulan terakhir`);

  },[data]);

  const handleTabChange = (value) => {
    setDisp(value);
  };


  return(
    <>
    <Container maxWidth="xl">

      {/* <Stack direction="row" alignItems="center" justifyContent="center " mb={5}>
        <SelectionTab tab={disp} setTab={handleTabChange}/>
      </Stack> */}

      <Grid container spacing={2} sx={{mt:1}}>
        <Grid item xs={6} sm={6} md={2}>
          <NumbersCard 
            header={`Anggaran Belanja`}
            number={`5,6 T`}
            footer={`DIPA 2024`}
            icon={`mdi:cash-register`}
            iconColor={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={2}>
          <NumbersCard 
            header={`Realisasi Belanja`}
            number={`2,3 T`}
            footer={`s.d. 19 Februari`}
            icon={`mdi:transfer`}
            iconColor={theme.palette.warning.main}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={2}>
          <NumbersCard 
            header={`Persentase Realisasi`}
            number={`32%`}
            footer={`dari total pagu`}
            icon={`mdi:chart-timeline-variant-shimmer`}
            iconColor={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <SpendingTypeCard 
            header={`Persentase Realisasi`}
            number={`32%`}
            footer={`dari total pagu`}
            icon={`mdi:chart-timeline-variant-shimmer`}
            iconColor={theme.palette.primary.main}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={8}>
          <SpendingChart
               title="Realisasi Belanja"
               subheader={'Dalam Milyar Rupiah (Rp)'}
               chart={{
                 labels: xAxisData,
                 series: [
                   {
                     name: 'Realisasi Belanja (Rp)',
                     type: 'area',
                     fill: 'gradient',
                     data: yAxisData && yAxisData,
                   },
                 ],
               }}
               style={{display:disp===0?"block":"none"}}
            />
            <RevenueChart
               title="Realisasi Pendapatan"
               subheader={'Dalam Milyar Rupiah (Rp)'}
               chart={{
                 labels: xAxisData && xAxisData,
                 series: [
                   {
                     name: 'Pendapatan Pajak',
                     type: 'area',
                     fill: 'gradient',
                     data: yAxisData && yAxisData.map((item) => item*Math.random())
                   },
                   {
                    name: 'PNBP ',
                    type: 'area',
                    fill: 'gradient',
                    data: yAxisData && yAxisData.map((item) => item*Math.random())
                  },
                 ],
               }}
               style={{display:disp===1?"block":"none"}}
            />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <JsonCard />
        </Grid> 

      </Grid>
    </Container>

    </>
  )


}