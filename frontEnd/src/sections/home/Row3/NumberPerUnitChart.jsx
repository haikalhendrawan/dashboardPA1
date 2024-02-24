import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card, CardHeader, Button,  } from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import Iconify from '../../../components/Iconify';
// utils
import { fNumber } from '../../../utility/formatNumber';
// components
import { useChart } from '../../../components/Charts';

// ----------------------------------------------------------------------
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

const allValue = ['Top 10', 'Bottom 10'];
// --------------------------------------------------------------------
export default function NumberPerUnit({ title, subheader, chartData, colors, ...other }) {
  const theme = useTheme();

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (val) => `Rp`,
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
    yaxis: {
      labels: {
        formatter: val => val,
      }
    },
    colors
  });

  return (
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
            // onClick={handleClick}
            >
            {allValue[0]}
          </StyledButton>
        }  
        />

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}