import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <Box
      component="img"
      src="/static/Linedata_Logo_RVB.png"
      sx={{ width: '10%', height: '20%', ...sx }}
    />
  );
}
