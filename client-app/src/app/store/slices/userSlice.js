import { createSlice } from '@reduxjs/toolkit';

const initialState={
    user: null,
    token: null,
    loading: false,
}

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        setToken: (state, {payload})=>{
            state.token = payload;
            window.localStorage.setItem('expense-tracker-token', payload);
        },
        removeToken: (state)=>{
            state.token = null;
            window.localStorage.removeItem('expense-tracker-token');
        },
        setUser: (state, {payload})=>{
            state.user = payload;
        },
        setLoading:(state, {payload})=>{
            state.loading = payload;
        },
        logout:(state)=>{
            state.token = null;
            state.user = null;
            window.localStorage.removeItem('expense-tracker-token')
        }
    }
})


export const {setToken, removeToken, setUser, setLoading, logout} = userSlice.actions;

export default userSlice;