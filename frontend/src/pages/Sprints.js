import { Container, Typography } from '@material-ui/core'; // components

import Page from '../components/Page';
import { ProductList } from '../components/_dashboard/products'; //

import PRODUCTS from '../_mocks_/products';
// ----------------------------------------------------------------------

export default function EcommerceShop() {
  return (
    <Page title="Sprints | Linedata-AMP">
      <Container>
        <Typography
          variant="h4"
          sx={{
            mb: 5
          }}
        >
          <img src="/static/icons/Agile.svg" alt="Sprint" /> Sprints
        </Typography>

        <ProductList products={PRODUCTS} />
      </Container>
    </Page>
  );
}
