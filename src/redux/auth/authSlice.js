import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      id: null,
      first_name: null,
      last_name: null,
      email: null,
      role: null,
    },
    token: localStorage.getItem('token') || null, 
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);  
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
        role: null,
      };
      state.token = null;
      localStorage.removeItem('token');
    },
    loadUserFromToken: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, loadUserFromToken } = authSlice.actions;
const BASE_URL = process.env.REACT_APP_BASE_URL; 

export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${BASE_URL}/api/users/login/`, { email, password });
    const { access } = response.data;
    dispatch(loginSuccess({ token: access }));
    dispatch(loadUser()); 
  } catch (error) {
    dispatch(loginFailure(error.response.data));
  }
};

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');  
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${BASE_URL}/api/users/profile/`);
      const { id, first_name, last_name, email, role } = response.data;
      dispatch(loadUserFromToken({
        user: {
          id,
          first_name,
          last_name,
          email,
          role,
        },
        token,
      }));
    }  catch (error) {
      console.error('Error fetching user profile:', error);
      if (error.response && (error.response.status === 401 || error.response.status === 404 )) {
        dispatch(logout());
        localStorage.clear(); 
      }
    }
  }
};

export default authSlice.reducer;
