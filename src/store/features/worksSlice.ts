import { createSlice } from '@reduxjs/toolkit';
import { Work } from '@/types/works';

interface WorksState {
    [key: string]: Work;
}

const initialState : WorksState = {};

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
        addWorks: (state, { payload }) => {
            payload.forEach((work : Work) => {
                state[work.id] = work;
            });
        },
    },
});

export const { getWorkSucceded, postWorkSucceded, addWorks } = slice.actions;

export default slice.reducer;
