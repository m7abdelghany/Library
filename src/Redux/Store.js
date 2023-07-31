import { configureStore } from '@reduxjs/toolkit';
import userinfoReducer from './CounterSlice';

const store = configureStore({
  reducer: {
    dataUser: userinfoReducer,
  },
});

export default store;