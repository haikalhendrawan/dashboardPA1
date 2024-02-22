import {useState} from "react";
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Button} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import Chart from '../../../components/Charts';
import { useChart } from '../../../components/Charts';
import Iconify from '../../../components/Iconify';

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

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

export default function RadialChart({ title, subheader, chart, ...other }) {
  const { labels, colors, series, options } = chart;
  // const [open, setOpen] = useState(null);
  const theme = useTheme();

  // const handleClick = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setOpen(null);
  // };

  
  const chartOptions = useChart({
    labels,
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [theme.palette.primary.light],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    ...options,
  });

  return (
    <>
    <Card {...other}>
      <CardHeader 
        title={title} 
        subheader={subheader} 
        // action={
        //   <StyledButton
        //     aria-label="settings" 
        //     variant='outlined'
        //     endIcon={<Iconify icon="mdi:arrow-down-drop" />}
        //     disableFocusRipple
        //     onClick={handleClick}
        //     >
        //     30 Day
        //   </StyledButton>
        // }
      />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="radialBar"
          series={series}
          options={chartOptions}
          width="100%"
          height={320}
        />
      </Box>
    </Card>

    {/* <DataSelectPopper open={open} close={handleClose} /> */}
    </>
  );
}