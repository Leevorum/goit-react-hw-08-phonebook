import { useSelector } from 'react-redux';
import React, { useEffect, useState, useMemo } from 'react';
import {
  useGetAllContactsQuery,
  useAddContactMutation,
} from 'redux/contacts/contacts-api';
import { getFilter } from 'redux/contacts/phoneBookSelectors';
import { getIsLogin } from 'redux/auth/authSelectors';
import BasicCustomSnackBar from 'components/BasicSnackBar/BasicSnackBar';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Contacts() {
  const filteredState = useSelector(getFilter);
  const { data, refetch } = useGetAllContactsQuery();
  const [addContact] = useAddContactMutation();
  const isLogin = useSelector(getIsLogin);
  const [open, setOpen] = useState(false);
  const [isNotification, setNotification] = useState('');
  const [severity, setSeverity] = useState('');

  //Force feth after re-login
  useEffect(() => {
    isLogin && refetch();
  }, [refetch, isLogin]);

  //Filter contacts + useMemo
  const filteredContacts = useMemo(() => {
    const contacts = data;
    const filter = filteredState;

    const toLowerCaseFilter = filter.toLowerCase();
    return contacts?.filter(contact => {
      return contact.name.toLowerCase().includes(toLowerCaseFilter);
    });
  }, [filteredState, data]);

  //Add contacts
  const handleAddContact = formData => {
    const existContact = data.filter(contact => {
      return contact.name.toLowerCase().includes(formData.name.toLowerCase());
    });
    // If the name is in the contact list, throw a notification and cancel the code execution
    if (existContact.length > 0) {
      setNotification(`${formData.name}, is already in your contacts`);
      setSeverity('error');
      setOpen(true);
      return;
    }

    addContact({ name: formData.name, number: formData.number });
    setNotification(`Success! ${formData.name} was added`);
    setSeverity('success');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            width: 420,
            height: 300,
            backgroundColor: 'action.dark',
          }}
        >
          <ContactForm onSubmit={handleAddContact} />

          <Container>
            <Filter />
            {data && <ContactList data={filteredContacts} />}
          </Container>
        </Container>
      </Box>
      <BasicCustomSnackBar
        open={open}
        onClose={handleClose}
        severity={severity}
        message={isNotification}
      />
    </div>
  );
}
