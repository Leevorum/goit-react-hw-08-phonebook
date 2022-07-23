import { useLoginMutation } from 'redux/auth/auth-api';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from 'redux/auth/authSlice';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicCustomSnackBar from 'components/BasicSnackBar/BasicSnackBar';

const theme = createTheme();

export default function LoginPage() {
  const [stateEmail, setStateEmail] = useState('');
  const [statePassword, setStatePassword] = useState('');
  const [login] = useLoginMutation();
  const { credentialsUpdate } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isError, setError] = useState('');

  const handleChange = evt => {
    evt.currentTarget.name === 'email'
      ? setStateEmail(evt.target.value)
      : setStatePassword(evt.target.value);
  };

  const handleLoginUser = evt => {
    evt.preventDefault();

    if (stateEmail.trim() === '' && statePassword.trim() === '') {
      setError('Please fill all filds');
      setOpen(true);
      return;
    }
    const loginCheckFetch = async loginData => {
      const response = await login(loginData);
      if (response.data) {
        credentialsUpdate(response.data);
        navigate('/contacts', { replace: true });
      }
    };
    loginCheckFetch({
      email: stateEmail,
      password: statePassword,
    });

    setStateEmail('');
    setStatePassword('');
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleLoginUser}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              value={stateEmail}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={statePassword}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <BasicCustomSnackBar
          open={open}
          onClose={handleClose}
          severity="error"
          message={isError}
        />
      </Container>
    </ThemeProvider>
  );
}
