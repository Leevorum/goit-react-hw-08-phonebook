import { useDeleteContactMutation } from 'redux/contacts/contacts-api';
import { useState } from 'react';
import ContactModalEdit from 'components/Modal/ContactModalEdit';
import PropTypes from 'prop-types';
import BasicCustomSnackBar from 'components/BasicSnackBar/BasicSnackBar';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ContactList({ data }) {
  const [deleteContact] = useDeleteContactMutation();
  const [open, setOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [isDeleted, setIsDelete] = useState('');

  const handleEdit = (id, name, number) => {
    setModalShow(true);
    setCurrentContact({ id, name, number });
  };

  const handleDelete = (id, name) => {
    deleteContact(id);
    setIsDelete(`Succes! ${name} was deleted`);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <List>
        {data.map(({ id, name, number }) => {
          return (
            <ListItem
              divider
              key={id}
              secondaryAction={
                <Box>
                  <Grid container spacing={1} align="center" direction="row">
                    <Grid item xs={6}>
                      <IconButton
                        onClick={() => {
                          handleEdit(id, name, number);
                        }}
                        color="primary"
                        edge="end"
                        aria-label="delete"
                      >
                        <EditIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton
                        onClick={() => handleDelete(id, name)}
                        color="primary"
                        aria-label="edit"
                        edge="end"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    backgroundColor: '#fff',
                  }}
                >
                  <AccountCircleIcon color="primary" fontSize="large" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} secondary={number} />
            </ListItem>
          );
        })}
      </List>

      {modalShow && (
        <ContactModalEdit
          modalShow={modalShow}
          contact={currentContact}
          onHide={() => setModalShow(false)}
        />
      )}
      <BasicCustomSnackBar
        open={open}
        onClose={handleClose}
        severity="success"
        message={isDeleted}
      />
    </>
  );
}

ContactList.propTypes = {
  data: PropTypes.array.isRequired,
};
