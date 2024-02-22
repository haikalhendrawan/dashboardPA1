import {useState} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button} from '@mui/material';
import {styled, useTheme, alpha} from '@mui/material/styles';
import debounce from "lodash.debounce"
import Chart from '../../../components/Charts';
import { useChart } from '../../../components/Charts';
import Iconify from '../../../components/Iconify';

export default function RadialChart(props) {
  const { labels, colors, series, toColor} = props.chart;
  const theme = useTheme();
  const [isHover, setIsHover] = useState(false);

  const LABEL_VALUE = {
    show: true,
    offsetY: -8,
    formatter: (val) => `${val} %`,
    color: theme.palette.text.primary,
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
    lineHeight: theme.typography.h5.lineHeight,
  };
  const LABEL_VALUE2 = {
    show: true,
    offsetY: -8,
    formatter: (val) => labels,
    color: theme.palette.text.primary,
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    lineHeight: theme.typography.h5.lineHeight,
  };

  
  const chartOptions = {
    labels:' ',
    chart: {
      id: `basic-bar${Math.random()}`,
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
        top: -20,
        right: -20,
        bottom: -20,
        left: -20,
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

  const delayedSetHover = debounce((value) => setIsHover(value), 200);

  return (
    <>
      <Box sx={{ p: 3, pb: 1, mt:-2 }} onMouseEnter={() => delayedSetHover(true)} onMouseLeave={() => delayedSetHover(false)}>
        <Chart
          dir="ltr"
          type="radialBar"
          series={series}
          options={chartOptions}
          width="100%"
          height="60%"
          style={{display:isHover?'none':'block', pointerEvents: isHover ? 'none' : 'auto' }}
        />
        <Chart
          dir="ltr"
          type="radialBar"
          series={series}
          options={{...chartOptions, plotOptions:{radialBar:{dataLabels:{value:LABEL_VALUE2}}}}}
          width="100%"
          height="60%"
          style={{display:isHover?'block':'none', pointerEvents: isHover ? 'none' : 'auto' }}
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