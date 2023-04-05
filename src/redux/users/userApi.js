import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Report } from 'notiflix/build/notiflix-report-aio';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkApi) => {
    try {
      const responce = await axios.post('/users/signup', userData);
      setAuthHeader(responce.data.token);
      return responce.data;
    } catch (error) {
      Report.failure('Error, try again', error.message, 'Okay');
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkApi) => {
    try {
      const responce = await axios.post('/users/login', userData);
      setAuthHeader(responce.data.token);

      return responce.data;
    } catch (error) {
      Report.failure('Error, try again', error.message, 'Okay');
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    Report.failure('Error, try again', error.message, 'Okay');
    return thunkApi.rejectWithValue(
      error.response ? error.response.data : error.message
    );
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const { token } = thunkApi.getState().auth;

    if (!token) {
      return thunkApi.rejectWithValue('No Valid token');
    }

    setAuthHeader(token);
    try {
      const responce = await axios.get('/users/current');
      return responce.data;
    } catch (error) {
      Report.failure('Error, try again', error.message, 'Okay');
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
