import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

export default function ContactForm({ onSubmit }) {
  const [stateName, setStateName] = useState('');
  const [stateNumber, setStateNumber] = useState('');

  const handleChange = evt => {
    evt.currentTarget.name === 'name'
      ? setStateName(evt.target.value)
      : setStateNumber(evt.target.value);
  };

  const handleAddContact = evt => {
    evt.preventDefault();
    onSubmit({ name: stateName, number: stateNumber });
    setStateName('');
    setStateNumber('');
  };

  return (
    <form className={s.contactForm} onSubmit={handleAddContact}>
      <label className={s.formItem}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          value={stateName}
          onChange={handleChange}
          placeholder="Boris Jonhson"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={s.formItem}>
        Number
        <input
          className={s.input}
          type="tel"
          name="number"
          value={stateNumber}
          onChange={handleChange}
          placeholder="+1 234 567 89"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit" className={s.btn}>
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
