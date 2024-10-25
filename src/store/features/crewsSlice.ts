import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const slice = createSlice({
    name: 'crews',
    initialState,
    reducers: {
        getCrewSucceded: (state, { payload }) => {
            // state[payload.id] = payload;
        },
        postCrewSucceded: (state, { payload }) => {
            // state[payload.id] = payload;
        },
    },
});

export const { getCrewSucceded, postCrewSucceded } = slice.actions;

export default slice.reducer;
