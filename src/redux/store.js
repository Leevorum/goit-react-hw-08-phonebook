import { configureStore } from '@reduxjs/toolkit';
import { filterSliceReducer } from './phoneBookSlice';
import { contactsApi } from './contacts-api';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,

    filter: filterSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
  devTools: process.env.NODE_ENV === 'development',
});

export { store };
setupListeners(store.dispatch);
