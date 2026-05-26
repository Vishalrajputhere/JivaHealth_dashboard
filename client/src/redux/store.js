import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import userDetailReducer from './slices/userDetailSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    userDetail: userDetailReducer,
  },
});

export default store;
