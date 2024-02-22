import {useState} from "react";
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, Button } from '@mui/material';
// utils
import { fNumber } from '../../../utility/formatNumber';
// components
import { useChart } from '../../../components/Charts';
import Iconify from '../../../components/Iconify';
import ProportionPopper from "./ProportionPopper";
// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

const StyledButton = styled(Button)(({theme}) => ({
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightMedium,
  borderRadius:'8px', 
  backgroundColor:theme.palette.background.neutral, 
  border:'0px',
  '&:hover': {
    outline:0,
    border:0,
  }
}));

const allValue = ['Anggaran', 'Realisasi']

// ----------------------------------------------------------------------

export default function AppCurrentVisits({ title, subheader, chartColors, chartData, ...other }) {
  const theme = useTheme();
  const [open, setOpen] = useState(null);
  const [value, setValue] = useState(0); //popper value

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    chart: {id: `rad-bar${Math.random()}`},
    colors: chartColors,
    labels: chartLabels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    // fill: {
    //   type: 'image',
    //   opacity: 0.9,
    //   image: {
    //      src: ['https://images-platform.99static.com//cgTTjtjYqqJv4cFlVlPGJQ5RILo=/610x67:1263x719/fit-in/500x500/99designs-contests-attachments/146/146964/attachment_146964351', 'https://i.insider.com/5c8e9c13d2ce78234577c6b4?width=1136&format=jpeg'],
    //     width: 10,
    //     imagedHeight: 10
    //   },
    // },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => `Rp ${fNumber(seriesName)}`,
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(newValue)
  };


  return (
    <>
    <Card {...other}>
      <CardHeader 
        title={title} 
        subheader={subheader} 
        action={
          <StyledButton
            aria-label="settings" 
            variant='outlined'
            endIcon={<Iconify icon="mdi:arrow-down-drop" />}
            disableFocusRipple
            onClick={handleClick}

            >
            {allValue[value]}
          </StyledButton>
        }
        />

      <StyledChartWrapper dir="ltr">
        <ReactApexChart type="pie" series={chartSeries} options={chartOptions} height={280} />
      </StyledChartWrapper>
    </Card>

    <ProportionPopper open={open} close={handleClose}  value={value} changeValue={handleChange}/>
    </>
  );
}