import * as Yup from 'yup';
import { forwardRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Slide
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Lock, Mail } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';

// ----------------------------------------------------------------------
const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right'
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState, severity, msg) => {
    setSeverity(severity);
    setState({ open: true, ...newState });
    setMessage(msg);
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      console.log(process.env.REACT_APP_API_URL);
      await fetch(`${process.env.REACT_APP_API_URL}/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      })
        .then((res) => {
          if (res.status === 200) {
            handleClick(
              {
                vertical: 'top',
                horizontal: 'right'
              },
              'success',
              'Logged Successfuly'
            );
            navigate('/dashboard', { replace: true });
          } else {
            formik.resetForm();
            handleClick(
              {
                vertical: 'top',
                horizontal: 'right'
              },
              'warning',
              res.statusText
            );
          }
        })
        .catch((err) => {
          console.log(err);
          handleClick(
            {
              vertical: 'top',
              horizontal: 'right'
            },
            'error',
            err.message
          );
        });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail />
                </InputAdornment>
              )
            }}
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          TransitionComponent={TransitionDown}
        >
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Form>
    </FormikProvider>
  );
}
