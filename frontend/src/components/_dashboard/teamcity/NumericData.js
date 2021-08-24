import PropTypes from 'prop-types';
// material
import { Grid, Card, Paper, Typography, CardHeader, CardContent } from '@material-ui/core';
// utils
import { Box } from '@material-ui/system';

SiteItem.propTypes = {
  site: PropTypes.object
};

function SiteItem({ site }) {
  const { value, name, icon } = site;

  return (
    <Grid item xs={6}>
      <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
        <Box sx={{ mb: 0.5 }}>{icon}</Box>
        <Typography variant="h6">{value}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {name}
        </Typography>
      </Paper>
    </Grid>
  );
}

NumericData.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  backgroundcolor: PropTypes.string,
  textcolor: PropTypes.string
};

export default function NumericData({ data, title, backgroundcolor, textcolor }) {
  return (
    <Card sx={{ backgroundColor: backgroundcolor }}>
      <CardHeader title={title} sx={{ color: textcolor, textAlign: 'center' }} />
      <CardContent>
        <Grid container spacing={2}>
          {data.map((site) => (
            <SiteItem key={site.name} site={site} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
