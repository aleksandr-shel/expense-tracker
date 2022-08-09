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
            window.localStorage.setItem('token', payload);
        },
        removeToken: (state)=>{
            state.token = null;
            window.localStorage.removeItem('token');
        },
        setUser: (state, {payload})=>{
            state.user = payload;
        },
        setLoading:(state, {payload})=>{
            state.loading = payload;
        }
    }
})


export const {setToken, removeToken, setUser, setLoading} = userSlice.actions;

export default userSlice;