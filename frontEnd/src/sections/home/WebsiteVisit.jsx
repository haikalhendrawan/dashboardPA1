import {useState} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button } from '@mui/material';
import {styled} from '@mui/material/styles';
import Chart from '../../components/Charts';
import { useChart } from '../../components/Charts';
import Iconify from '../../components/Iconify';
import DataPeriodPopper from './DataPeriodPopper';

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;


export default function WebsiteVisits({ title, subheader, chart, ...other }) {
  const { labels, colors, series, options } = chart;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
            sx={{borderRadius:'8px', backgroundColor:'rgb(244, 246, 248)', border:'0px'}}
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

    <DataPeriodPopper anchorEl={anchorEl} />
    </>
  );
}