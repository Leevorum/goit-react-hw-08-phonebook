import { useEffect } from 'react';
import { useState } from 'react';
import { useEditContactMutation } from 'redux/contacts/contacts-api';
import PropTypes from 'prop-types';
import BasicCustomSnackBar from 'components/BasicSnackBar/BasicSnackBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

export default function ContactModalEdit({ contact, onHide, modalShow }) {
  const [editContact] = useEditContactMutation();
  const [open, setOpen] = useState(false);
  const [name, setStateName] = useState('');
  const [number, setStateNumber] = useState('');
  const [id, setId] = useState('');
  const [isNotification, setNotification] = useState('');

  const handleChange = evt => {
    evt.currentTarget.name === 'name'
      ? setStateName(evt.target.value)
      : setStateNumber(evt.target.value);
  };

  const handleEditContact = evt => {
    evt.preventDefault();
    if (name.trim() === '' && number.trim() === '') {
      setNotification('Please fill all filds');
      setOpen(true);
      return;
    }

    const editContactFetch = async ({ id, name, number }) => {
      try {
        editContact({ id, name, number });
      } catch (error) {
        setNotification(`Error! Something went wrong please try again `);
        setOpen(true);
      }
    };

    editContactFetch({ id, name, number });
    setStateName('');
    setStateNumber('');
    onHide();
  };

  useEffect(() => {
    if (contact) {
      setStateName(contact.name);
      setStateNumber(contact.number);
      setId(contact.id);
    }
  }, [contact]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={modalShow}
        onClose={onHide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 420,
            height: 350,
            bgcolor: 'background.paper',
            border: '1px solid #000',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            component="form"
            onSubmit={handleEditContact}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              value={name}
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
              value={number}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="number"
              label="Number"
              type="text"
              id="number"
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Edit
            </Button>
            <Button
              onClick={onHide}
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
      <BasicCustomSnackBar
        open={open}
        onClose={handleClose}
        severity="error"
        message={isNotification}
      />
    </>
  );
}

ContactModalEdit.propTypes = {
  contact: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
};
