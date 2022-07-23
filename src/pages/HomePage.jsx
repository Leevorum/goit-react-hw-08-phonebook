import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function HomePage() {
  return (
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
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, marginTop: 10 }}
        >
          Welcome, Guest. Please <Link to="login">login</Link> or {''}
          <Link to="register">register</Link>.
        </Typography>
      </Container>
    </Box>
  );
}
