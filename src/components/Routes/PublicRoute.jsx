import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLogin } from 'redux/auth/authSelectors';
import PropTypes from 'prop-types';

export function PublicRoute({ children }) {
  const isLogin = useSelector(getIsLogin);
  return !isLogin ? children : <Navigate to={'/contacts'} />;
}

PublicRoute.propTypes = {
  children: PropTypes.node,
};
