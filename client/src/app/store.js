import { configureStore } from '@reduxjs/toolkit';
import globalReducer from '../features/index'
import adminReducer from '../features/admin/admin.slice'


export const store = configureStore({
  reducer: {
    global:globalReducer,
    adminApi:adminReducer
  },
});
