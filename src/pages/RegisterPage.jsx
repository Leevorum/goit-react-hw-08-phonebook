import { useAddNewUserMutation } from 'redux/auth/auth-api';
import { useState } from 'react';
import { useAuth } from 'redux/auth/authSlice';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicCustomSnackBar from 'components/BasicSnackBar/BasicSnackBar';

const theme = createTheme();

export default function RegisterPage() {
  const [stateName, setStateName] = useState('');
  const [stateEmail, setStateEmail] = useState('');
  const [statePassword, setStatePassword] = useState('');
  const [addNewUser, { isLoading }] = useAddNewUserMutation();
  const { credentialsUpdate } = useAuth();
  const [isNotification, setNotification] = useState('');
  const [open, setOpen] = useState(false);
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const nameRegExp =
    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

  const handleChange = evt => {
    switch (evt.currentTarget.name) {
      case 'name':
        setStateName(evt.target.value);
        break;
      case 'email':
        setStateEmail(evt.target.value);
        break;
      case 'password':
        setStatePassword(evt.target.value);
        break;
      default:
        return;
    }
  };

  const handleAddNewUser = evt => {
    evt.preventDefault();

    const testEmail = emailRegExp.test(stateEmail);
    const testName = nameRegExp.test(stateName);

    const loginCheckFetch = async loginData => {
      //Prevents an empty request
      if (
        stateEmail.trim() === '' &&
        statePassword.trim() === '' &&
        stateName.trim() === ''
      ) {
        setNotification('Please fill all filds');
        setOpen(true);
        return;
      }
      if (!testEmail) {
        setNotification('Email is not valid');
        setOpen(true);
        return;
      }

      if (!testName) {
        setNotification(
          "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
        );
        setOpen(true);
        return;
      }
      try {
        const response = await addNewUser(loginData);
        if (response?.error?.status === 400) {
          setNotification('This email is already in use');
          setOpen(true);
          return;
        } else {
          credentialsUpdate(response.data);
        }
      } catch (error) {
        setNotification(error);
        setOpen(true);
      }
    };

    loginCheckFetch({
      name: stateName,
      email: stateEmail,
      password: statePassword,
    });
    setStateName('');
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
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleAddNewUser}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              value={stateName}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
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

            {isLoading ? (
              <LoadingButton
                loading
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}
          </Box>
        </Box>

        <BasicCustomSnackBar
          open={open}
          onClose={handleClose}
          severity="error"
          message={isNotification}
        />
      </Container>
    </ThemeProvider>
  );
}
