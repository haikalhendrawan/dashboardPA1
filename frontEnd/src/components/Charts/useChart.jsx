import merge from 'lodash/merge';
// @mui
import { useTheme, alpha } from '@mui/material/styles';


// ----------------------------------------------------------------------

export default function useChart(options) {

  const LABEL_TOTAL = {
    show: true,
    label: 'Total',
    color: 'rgb(255, 255, 255)',
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 22 / 14,
  };

  const LABEL_VALUE = {
    offsetY: 8,
    color: 'rgb(255, 255, 255)',
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1.5,
  };

  const baseOptions = {
    // Colors
    colors: [
      '#2065D1',
      '#FFC107',
      '#1890FF',
      '#FF4842',
      '#54D62C',
      '#B78103',
      '#7A4F01',
      '#0C53B7',
      '#04297A',
    ],

    // Chart
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      // animations: { enabled: false },
      foreColor: 'rgba(255, 255, 255, 0.5)',
      fontFamily:'Public Sans, sans-serif',
    },

    // States
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

    // Fill
    fill: {
      opacity: 1,
      gradient: {
        type: 'vertical',
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    // Datalabels
    dataLabels: { enabled: false },

    // Stroke
    stroke: {
      width: 3,
      curve: 'smooth',
      lineCap: 'round',
    },

    // Grid
    grid: {
      strokeDashArray: 3,
      borderColor: alpha('#919EAB', 0.24),
      xaxis: {
        lines: {
          show: false,
        },
      },
    },

    // Xaxis
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    // Markers
    markers: {
      size: 0,
      strokeColors: '#fff',
    },

    // Tooltip
    tooltip: {
      x: {
        show: false,
      },
    },

    // Legend
    legend: {
      show: true,
      fontSize: String(13),
      position: 'top',
      horizontalAlign: 'right',
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: { horizontal: 12 },
      labels: {
        colors: '#D1E9FC',
      },
    },

    // plotOptions
    plotOptions: {
      // Bar
      bar: {
        borderRadius: 4,
        columnWidth: '28%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },

      // Pie + Donut
      pie: {
        donut: {
          labels: {
            show: true,
            value: LABEL_VALUE,
            total: LABEL_TOTAL,
          },
        },
      },

      // Radialbar
      radialBar: {
        track: {
          strokeWidth: '100%',
          background: alpha('#919EAB', 0.24),
        },
        dataLabels: {
          value: LABEL_VALUE,
          total: LABEL_TOTAL,
        },
      },

      // Radar
      radar: {
        polygons: {
          fill: { colors: ['transparent'] },
          strokeColors: alpha('#919EAB', 0.24),
          connectorColors: alpha('#919EAB', 0.24),
        },
      },

      // polarArea
      polarArea: {
        rings: {
          strokeColor: alpha('#919EAB', 0.24),
        },
        spokes: {
          connectorColors: alpha('#919EAB', 0.24),
        },
      },
    },

    // Responsive
    responsive: [
      {
        // sm
        breakpoint: 600,
        options: {
          plotOptions: { bar: { columnWidth: '40%' } },
        },
      },
      {
        // md
        breakpoint: 900,
        options: {
          plotOptions: { bar: { columnWidth: '32%' } },
        },
      },
    ],
  };

  return merge(baseOptions, options);
}