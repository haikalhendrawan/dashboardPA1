import {useState} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import Chart from '../../../components/Charts';
import { useChart } from '../../../components/Charts';
import Iconify from '../../../components/Iconify';
import DataSelectPopper from './DataSelectPopper';
// ---------------------------------------------------------------------------

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

const allValue = ['30 Day', 'This Month', "All Year"];
// ---------------------------------------------------------------------------

export default function SpendingTrend({ title, subheader, chart, trend, changeTrend, ...other }) {
  const { labels, colors, series, options } = chart;
  const [open, setOpen] = useState(null);
  const theme = useTheme();

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChange = (newValue) => {
    changeTrend(newValue);
  };

  
  const chartOptions = useChart({
    chart: {id: `bar${Math.random()}`},
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
      labels: {
        formatter: function (value) {
           const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short' });
           const formattedDate = formatter.format(value);
           return formattedDate 
           }, 
      }
    },
    yaxis:{
      labels: {
        formatter: (value) => {
          return value/1000000000 + "M";
        }
      },
    },
    // Markers
    markers: {
      size: 5,
      strokeColors: theme.palette.background.paper,
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
          <StyledButton
            aria-label="settings" 
            variant='outlined'
            endIcon={<Iconify icon="mdi:arrow-down-drop" />}
            disableFocusRipple
            onClick={handleClick}
            >
            {allValue[trend]}
          </StyledButton>
        }
      />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={365}
        />
      </Box>
    </Card>

    <DataSelectPopper open={open} close={handleClose} value={trend} changeValue={handleChange}/>
    </>
  );
}