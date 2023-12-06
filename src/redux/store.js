import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/auth'



export const store = configureStore({
    reducer: {
       
        user: userReducer,
        
        
    }
}) 