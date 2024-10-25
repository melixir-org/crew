import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/userSlice';
import crewsReducer from './features/crewsSlice';
import worksReducer from './features/worksSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            crews: crewsReducer,
            works: worksReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
