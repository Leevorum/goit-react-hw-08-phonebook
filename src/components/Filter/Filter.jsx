import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/contacts/phoneBookSelectors';
import { addFilter } from 'redux/contacts/phoneBookSlice';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const handleChange = evt => {
    dispatch(addFilter(evt.target.value));
  };
  return (
    <>
      <Typography component="h6" variant="h6" align="center">
        Find contacts by name
      </Typography>
      <TextField
        align="center"
        value={filter}
        onChange={handleChange}
        margin="normal"
        fullWidth
        id="filter"
        label=""
        name="email"
        autoFocus
      />
    </>
  );
}
