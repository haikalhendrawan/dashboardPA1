import {useEffect, useState} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button, Stack, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import Chart from '../../../components/Charts';
import { useChart } from '../../../components/Charts';
import Iconify from '../../../components/Iconify';
import AccountSelectPopper from './AccountSelectPopper';
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

const StyledMenuItem = styled(MenuItem)(({theme}) => ({
  typography:'body2',
  fontSize:12
}));

const allValue = ['30 Day', 'This Month', "All Year"];
// ---------------------------------------------------------------------------

export default function PerAccountTrend({ 
  title, 
  subheader, 
  chart, 
  trend, 
  changeTrend, 
  account, 
  allAccount,
  changeAccount, 
  ...other 
  }) {
  const { labels, colors, series, options } = chart;
  const [open, setOpen] = useState(null);
  const theme = useTheme();
  const [isReady, setIsReady] = useState(false);

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChange = (newValue) => {
    changeTrend(newValue);
  };

  const handleChange2 = (event) => {
    changeAccount(event.target.value);
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

  useEffect(() => {
    allAccount.length>130?setIsReady(true):setIsReady(false)
  }, [allAccount])


  return (
    <>
    <Card {...other}>
      <CardHeader 
        title={title} 
        subheader={subheader} 
        action={
          <>
          <Stack direction={'row'} spacing={1}>
            {allAccount.length>1 && (
            <FormControl size="small" sx={{width:100}}>
              <InputLabel id="select-account-label">Akun</InputLabel>
              <Select
                labelId="select-account-label"
                id="select-account"
                value={account}
                label="Akun"
                onChange={handleChange2}
                sx={{fontSize:12, borderRadius:'8px'}}
                MenuProps={{PaperProps: { sx: { maxHeight: 350, borderRadius:'12px', fontSize:10 } }}}
              >
                {allAccount.map((row, index) =>(
                  <StyledMenuItem 
                    value={row.akun}
                    key={index+1}
                  >
                    {`${row.akun} - ${row.nmakun}`}
                  </StyledMenuItem> 
                  ))}
              </Select>
            </FormControl>
            )}

            <StyledButton
              aria-label="settings" 
              variant='outlined'
              endIcon={<Iconify icon="mdi:arrow-down-drop" />}
              disableFocusRipple
              onClick={handleClick}
              >
              {allValue[trend]}
            </StyledButton>
          </Stack>
          </>
        }
      />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={333}
        />
      </Box>
    </Card>

    <AccountSelectPopper open={open} close={handleClose} value={trend} changeValue={handleChange}/>
    </>
  );
}