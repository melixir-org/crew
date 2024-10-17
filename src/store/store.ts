import { configureStore } from '@reduxjs/toolkit';

import crewsReducer from './features/crews';
import usersReducer from './features/users';

export const makeStore = () => {
    return configureStore({
        reducer: {
            crews: crewsReducer,
            users: usersReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
