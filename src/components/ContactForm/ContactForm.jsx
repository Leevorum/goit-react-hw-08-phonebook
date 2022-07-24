import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicCustomSnackBar from 'components/BasicSnackBar/BasicSnackBar';

export default function ContactForm({ onSubmit }) {
  const [stateName, setStateName] = useState('');
  const [stateNumber, setStateNumber] = useState('');
  const [open, setOpen] = useState(false);
  const [isNotification, setNotification] = useState('');

  const handleChange = evt => {
    evt.currentTarget.name === 'name'
      ? setStateName(evt.target.value)
      : setStateNumber(evt.target.value);
  };

  const handleAddContact = evt => {
    evt.preventDefault();

    if (stateName.trim() === '' && stateNumber.trim() === '') {
      setNotification('Please fill all filds');
      setOpen(true);
      return;
    }
    onSubmit({ name: stateName, number: stateNumber });
    setStateName('');
    setStateNumber('');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PhoneIphoneIcon />
          </Avatar>

          <Box
            component="form"
            onSubmit={handleAddContact}
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
              value={stateNumber}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="number"
              label="Number"
              type="text"
              id="number"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add contact
            </Button>
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

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
