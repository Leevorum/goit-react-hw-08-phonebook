import { useSelector, useDispatch } from 'react-redux';
import s from './Filter.module.css';
import { getFilter } from 'redux/phoneBookSelectors';
import { addFilter } from 'redux/phoneBookSlice';

export default function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const handleChange = evt => {
    dispatch(addFilter(evt.target.value));
  };
  return (
    <label className={s.filterLabel}>
      Find contacts by name
      <input
        className={s.filterInput}
        type="text"
        name="filter"
        value={filter}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </label>
  );
}
