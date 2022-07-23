import { getIsLogin } from 'redux/auth/authSelectors';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export function PrivateRoute({ children }) {
  const isLogin = useSelector(getIsLogin);
  return isLogin ? children : <Navigate to={'/'} />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
