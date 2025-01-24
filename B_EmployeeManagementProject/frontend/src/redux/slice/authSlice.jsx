import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.token);
            console.log(action.payload);
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;