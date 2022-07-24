import { useLogoutMutation } from 'redux/auth/auth-api';
import { useAuth } from 'redux/auth/authSlice';
import { getEmail, getIsLogin, getName } from 'redux/auth/authSelectors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

export function UserMenu() {
  const [logout] = useLogoutMutation();
  const { credentialsUpdate } = useAuth();
  const email = useSelector(getEmail);
  const isLogin = useSelector(getIsLogin);
  const name = useSelector(getName);
  const navigate = useNavigate();

  const handleLogout = () => {
    const loginCheckFetch = async () => {
      const response = await logout();
      if (Object.keys(response.data).length === 0) {
        credentialsUpdate({ user: null, token: null, isLogin: false });
      }
    };
    loginCheckFetch();
    navigate('/', { replace: true });
  };
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <AppBar
          position="static"
          sx={{
            paddingRight: 5,
            paddingLeft: 10,
          }}
        >
          <Toolbar
            sx={{
              paddingRight: 5,
              paddingLeft: 10,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            <Link to="/" style={{ color: '#fff' }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <PhoneIphoneIcon />
              </IconButton>
            </Link>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Wellcome to PhoneBook App {isLogin ? name : 'user'}
            </Typography>

            <Typography variant="h6" align="right" marginRight={2}>
              {isLogin && email}
            </Typography>
            {isLogin && (
              <Button onClick={handleLogout} variant="outlined" color="inherit">
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
