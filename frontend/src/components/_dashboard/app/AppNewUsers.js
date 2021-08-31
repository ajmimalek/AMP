import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { CheckCircle } from '@material-ui/icons';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.success.darker,
  backgroundColor: theme.palette.success.light
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.success.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.success.dark, 0)} 0%, ${alpha(
    theme.palette.success.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

AppNewUsers.propTypes = {
  SuccessfulBuilds: PropTypes.number
};

export default function AppNewUsers({ SuccessfulBuilds }) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <CheckCircle width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{SuccessfulBuilds}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Successful Builds
      </Typography>
    </RootStyle>
  );
}
