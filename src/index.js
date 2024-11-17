// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/auth/authSlice';  // Ensure loadUser is imported
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import LoginForm from './components/LoginForm';
import Tasks from './pages/Tasks';
import Users from './pages/Admin/Users.jsx';
import TaskSubmitted from './components/TaskSubmitted.jsx';
import Documents from './pages/Documents.jsx';
import Feedbacks from './pages/Feddbacks.jsx';
import Dashboard from './components/Dashboard.jsx';
import FeedbackView from './components/Feedbacks/FeedbackView.jsx';
import BaseElement from './components/BaseElement.jsx';
import UsersPerfomance from './components/Admin/Users/UsersPerfomance.jsx';
// import ToBeAdded from './pages/ToBeAdded.jsx';
const router = createBrowserRouter([
  { path: "/", element: <BaseElement /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/tasks/:id?", element: <PrivateRoute><Tasks /></PrivateRoute> },
  { path: "/dashboard", element: <PrivateRoute><Dashboard /></PrivateRoute> },
  { path: "/users", element: <AdminRoute><Users /></AdminRoute> },
  { path: "/users-perfomance/:id", element: <AdminRoute><UsersPerfomance /></AdminRoute> },
  { path: "/submitted", element: <PrivateRoute><TaskSubmitted /></PrivateRoute> },
  { path: "/document", element: <PrivateRoute><Documents /></PrivateRoute> },
  { path: "/feedback", element: <PrivateRoute><Feedbacks /></PrivateRoute> },
  { path: "/feedback-view/:id", element: <PrivateRoute><FeedbackView /></PrivateRoute> },
]);

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUser());  
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
