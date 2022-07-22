import { useSelector } from 'react-redux';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import Section from 'components/Section/Section';
import {
  useGetAllContactsQuery,
  useAddContactMutation,
  useCheckContactMutation,
} from '../../redux/contacts-api';
import { getFilter } from 'redux/phoneBookSelectors';
import { useMemo } from 'react';

import toast, { Toaster } from 'react-hot-toast';

export function App() {
  const filteredState = useSelector(getFilter);

  const { data } = useGetAllContactsQuery();
  const [addContact] = useAddContactMutation();
  const [checkContact] = useCheckContactMutation();

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
    // If the name is in the contact list, throw a notification and cancel the code execution
    const checkedContactFetch = async contact => {
      const checkedContact = await checkContact(contact.name);
      console.log(checkedContact);
      if (checkedContact.data.length > 0) {
        const existNotification = () => {
          toast.error(`${contact.name}, is already in your contacts`, {
            position: 'top-left',
          });
        };
        existNotification();
        return;
      } else {
        addContact({ name: contact.name, phone: contact.number });
        const successNotification = () =>
          toast.success(`Succes! ${contact.name} was added`, {
            position: 'top-left',
          });
        successNotification();
      }
    };

    checkedContactFetch(formData);
  };

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm onSubmit={handleAddContact} />
      </Section>
      <Toaster />
      <Section title="Contacts">
        <Filter />
        {data && <ContactList data={filteredContacts} />}
      </Section>
    </div>
  );
}
