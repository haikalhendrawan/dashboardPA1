import {useState} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button } from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import Chart from '../../components/Charts';
import { useChart } from '../../components/Charts';
import Iconify from '../../components/Iconify';
import DataSelectPopper from './DataSelectPopper';

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;


export default function RevenueChart({ title, subheader, chart, ...other }) {
  const { labels, colors, series, options } = chart;
  const [open, setOpen] = useState(null);
  const theme = useTheme();

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const buttonStyle = {
    color:theme.palette.text.primary,
    fontWeight:theme.typography.fontWeightMedium,
    borderRadius:'8px', 
    backgroundColor: theme.palette.background.neutral, 
    border:'0px'
  };
  
  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'datetime',
    },
    yaxis:{
      labels: {
        formatter: (value) => {
          return value/1000000000 + "M";
        }
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            const IDR = new Intl.NumberFormat('id-ID', {
              style:'currency',
              currency:'IDR',
              maximumFractionDigits: 0, 
              minimumFractionDigits: 0, 
            })
            return `${IDR.format(value)}`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <>
    <Card {...other}>
      <CardHeader 
        title={title} 
        subheader={subheader} 
        action={
          <Button 
            aria-label="settings" 
            variant='outlined'
            sx={buttonStyle}
            endIcon={<Iconify icon="mdi:arrow-down-drop" />}
            onClick={handleClick}
            >
            30 Day
          </Button>
        }
      />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>

    <DataSelectPopper open={open} close={handleClose} />
    </>
  );
}