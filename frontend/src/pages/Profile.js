import { Box, Card, Container } from '@material-ui/core'; // components

import Page from '../components/Page';

function Profile() {
  return (
    <Page title="My Profile | Linedata-AMP">
      <Container>
        <Card>
          <Box
            component="img"
            src="/static/illustrations/Coming Soon.png"
            sx={{ width: '10%', height: '20%' }}
          />
        </Card>
      </Container>
    </Page>
  );
}

export { Profile as default };
