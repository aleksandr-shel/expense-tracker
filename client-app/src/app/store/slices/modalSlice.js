import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    open: false,
    body: <></>
}


const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers: {
        setActive:(state, action)=>{
            state.open = action.payload;
        },
        setBody:(state, action)=>{
            state.body = action.payload;
        },
        closeModal:(state)=>{
            state.body = <></>;
            state.open = false;
        },
        openModal:(state, action)=>{
            state.body = action.payload;
            state.open = true;
        },
    }
})

export const {closeModal, openModal} = modalSlice.actions;


export default modalSlice;