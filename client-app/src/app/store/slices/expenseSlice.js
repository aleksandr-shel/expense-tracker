import {createSlice} from "@reduxjs/toolkit";

const initialState= {
    expenses: [],
    loading: false,
}


const expenseSlice = createSlice({
    name:'expenses',
    initialState,
    reducers:{
        setExpenses: (state, action)=>{
            state.expenses = action.payload;
        },
        setLoading: (state, action)=>{
            state.loading = action.payload;
        },
    }
})

export const {setExpenses, setLoading} = expenseSlice.actions

export default expenseSlice;