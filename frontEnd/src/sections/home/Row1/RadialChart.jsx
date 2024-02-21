import {useState} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button} from '@mui/material';
import {styled, useTheme, alpha} from '@mui/material/styles';
import Chart from '../../../components/Charts';
import { useChart } from '../../../components/Charts';
import Iconify from '../../../components/Iconify';
import DataSelectPopper from '../DataSelectPopper';

export default function RadialChart(props) {
  const { labels, colors, series, toColor} = props.chart;
  const theme = useTheme();
  const [isHover, setIsHover] = useState(true);


  const LABEL_VALUE = {
    show: true,
    offsetY: -8,
    formatter: (val) => isHover?`${val}%`:labels,
    color: theme.palette.text.primary,
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
    lineHeight: theme.typography.h5.lineHeight,
  };

  
  const chartOptions = {
    labels:' ',
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      // animations: { enabled: false },
      foreColor: theme.palette.text.disabled,
      fontFamily: theme.typography.fontFamily,
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.88,
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [toColor],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    grid: {
      padding: {
        top: -15,
        right: -20,
        bottom: -20,
        left: -15,
      }
    },
    legend: {
      show: false
    },
    stroke: {
      width: 3,
      curve: 'smooth',
      lineCap: 'round',
    },
    plotOptions:{
      radialBar: {        
        track: {
        strokeWidth: '100%',
        background: alpha(theme.palette.grey[500], 0.16),
        },
        dataLabels: {
          value: LABEL_VALUE,
        },
      },
    }, 
    colors: [
      colors
    ],
  };

  return (
    <>
      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="radialBar"
          series={series}
          options={chartOptions}
          width="100%"
          height="50%"
        />
      </Box>
    </>
  );
}

function formatAsCurrency(value) {
  // Implement your currency formatting logic here
  // For example, you can use Intl.NumberFormat API
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD', // Change this based on your currency
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}