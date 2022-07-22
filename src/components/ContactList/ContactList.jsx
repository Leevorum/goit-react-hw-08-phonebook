import toast from 'react-hot-toast';
import s from './ContactList.module.css';
import { useDeleteContactMutation } from '../../redux/contacts-api';

export default function ContactList({ data }) {
  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = (id, name) => {
    deleteContact(id);
    const deleteNotification = () =>
      toast.success(`Succes! ${name} was deleted`, { position: 'top-left' });
    deleteNotification();
  };

  return (
    <ul className={s.list}>
      {data.map(contact => {
        return (
          <li key={contact.id} className={s.listItem}>
            {contact.name} : {contact.phone}
            <button
              className={s.btn}
              onClick={() => handleDelete(contact.id, contact.name)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
