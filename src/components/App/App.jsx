import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { useSelector } from 'react-redux';
import { getToken } from 'redux/auth/authSelectors';
import { useAuth } from 'redux/auth/authSlice';
import { useCurrentUserMutation } from 'redux/auth/auth-api';
import { useEffect } from 'react';
import { getIsLogin } from 'redux/auth/authSelectors';
import { PrivateRoute } from 'components/Routes/PrivateRoute';
import { PublicRoute } from 'components/Routes/PublicRoute';

const HomePage = lazy(
  () => import('pages/HomePage') /* webpackChunkName: "HomePage" */,
);
const ContactsPage = lazy(
  () => import('pages/ContactsPage') /* webpackChunkName: "ContactsPage" */,
);
const LoginPage = lazy(
  () => import('pages/LoginPage') /* webpackChunkName: "LoginPage" */,
);
const RegisterPage = lazy(
  () => import('pages/RegisterPage') /* webpackChunkName: "RegisterPage" */,
);

export function App() {
  const token = useSelector(getToken);
  const { credentialsUpdate } = useAuth();
  const [currentUser, { isUninitialized }] = useCurrentUserMutation();
  const isLogin = useSelector(getIsLogin);

  useEffect(() => {
    if (token && isUninitialized) {
      const checkCurrentUser = async () => {
        const response = await currentUser();
        if (response.data) {
          credentialsUpdate({ user: response.data, token, isLogin });
        }
      };
      checkCurrentUser();
    }
  }, [credentialsUpdate, currentUser, isLogin, isUninitialized, token]);

  return (
    <div>
      <UserMenu />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          <Route
            exact
            path="login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            exact
            path="contacts"
            element={
              <PrivateRoute exact path="contacts">
                <ContactsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found</h2>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}