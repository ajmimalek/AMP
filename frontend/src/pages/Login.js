// material
import { styled } from '@material-ui/core/styles';
import { Card, Stack, Container, Typography, Box } from '@material-ui/core';
// layouts
import { useEffect, useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import AuthSocial from '../components/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const QuoteStyle = styled('div')(() => ({
  marginTop: '60px',
  '&>Card': {
    marginLeft: '10px',
    marginRight: '10px'
  }
}));
// ----------------------------------------------------------------------

export default function Login() {
  // Quotes
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  useEffect(() => {
    fetch('http://quotes.rest/qod.json?category=inspire')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuote(data.contents.quotes[0].quote);
        setAuthor(data.contents.quotes[0].author);
        setImage(data.contents.quotes[0].background);
      });
  }, []);
  return (
    <RootStyle title="Login | Linedata-AMP">
      <AuthLayout />

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi AMP Member, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 1 }}>
            <Typography variant="h4">Sign in</Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>
          <AuthSocial />

          <LoginForm />

          <QuoteStyle>
            <Card>
              <Stack direction="row" alignItems="center" spacing={3} sx={{ p: 3, pr: 0 }}>
                <Box
                  component="img"
                  alt="Quote of the Day"
                  src={image}
                  sx={{ width: 48, height: 48, borderRadius: 1.5 }}
                />
                <Box sx={{ minWidth: 240 }}>
                  <Typography variant="subtitle2" noWrap>
                    {author}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} Wrap>
                    {quote}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </QuoteStyle>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
