// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
// components
import Page from '../components/Page';
import {
  AppNewUsers,
  AppItemOrders,
  AppWeeklySales,
  AppCurrentVisits
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [failed, setFailed] = useState(0);
  const [success, setSuccess] = useState(0);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/TeamCity/build/dashboard`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const content = await res.json();
      console.log(content);
      setFailed(content.buildFailure);
      setSuccess(content.buildSuccess);
    })();
  }, []);
  return (
    <Page title="Dashboard | Linedata-AMP">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWeeklySales FailedBuilds={failed} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppNewUsers SuccessfulBuilds={success} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppItemOrders TOTAL={failed + success} />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppCurrentVisits CHART_DATA={[success, failed]} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
