import PropTypes from 'prop-types';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

CodeCoverageChart.propTypes = {
  CHART_DATA: PropTypes.array
};

export default function CodeCoverageChart({ CHART_DATA }) {
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: true },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '28%',
        borderRadius: 4
      }
    },
    xaxis: {
      categories: ['Class', 'Method', 'Statement']
    }
  });

  return (
    <Card>
      <CardHeader title="Code Coverage Summary" subheader="Extracted from Coverage Percent" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={294} />
      </Box>
    </Card>
  );
}
