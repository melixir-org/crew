import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const slice = createSlice({
    name: 'works',
    initialState,
    reducers: {
        getWorkSucceded: (state, { payload }) => {
            // state[payload.id] = payload;
        },
        postWorkSucceded: (state, { payload }) => {
            // state[payload.id] = payload;
        },
    },
});

export const { getWorkSucceded, postWorkSucceded } = slice.actions;

export default slice.reducer;
