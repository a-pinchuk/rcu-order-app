import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Report } from 'notiflix/build/notiflix-report-aio';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const responce = await axios.get('/contacts');
      return responce.data;
    } catch (error) {
      Report.failure('Error, try again', error.message, 'Okay');
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addContacts = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkApi) => {
    try {
      const responce = await axios.post('/contacts', contactData);
      return responce.data;
    } catch (error) {
      Report.failure('Error, try again', error.message, 'Okay');
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkApi) => {
    try {
      const responce = await axios.delete(`/contacts/${contactId}`);
      return responce.data;
    } catch (error) {
      Report.failure('Error, try again', error.message, 'Okay');
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const clearContacts = createAsyncThunk(
  'contacts/clearContacts',
  async () => {
    return;
  }
);
