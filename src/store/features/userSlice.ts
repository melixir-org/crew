import { createSlice } from '@reduxjs/toolkit';

const initialState = { auth: null, userSettings: null };

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userSignedIn: (state, { payload }) => {
            state.auth = payload;
        },
        userSignedOut: state => {
            state.auth = initialState.auth;
        },
        userSettings: (state, { payload }) => {
            state.userSettings = payload;
        },
    },
});

export const { userSignedIn, userSignedOut, userSettings } = slice.actions;

export default slice.reducer;
