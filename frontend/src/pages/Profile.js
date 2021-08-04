import { Box, Card, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
// components
import Page from '../components/Page';

const styles = (theme) => ({
  soon: {
    [theme.breakpoints.down('lg')]: {
      marginTop: '200px'
    }
  }
});

const useStyles = makeStyles(styles);

function Profile() {
  const classes = useStyles();
  return (
    <Page title="My Profile | Linedata-AMP">
      <Container>
        <Card className={classes.soon}>
          <Box
            component="img"
            src="/static/illustrations/Coming Soon.png"
            sx={{ width: '100%', height: '20%' }}
          />
        </Card>
      </Container>
    </Page>
  );
}

export { Profile as default };
