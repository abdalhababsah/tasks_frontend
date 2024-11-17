import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/auth/authSlice';
import LoginForm from './components/LoginForm';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default App;