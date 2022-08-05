import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./slices/expenseSlice";



const store = configureStore({
    reducer:{
        expenseReducer: expenseSlice.reducer
    }
})


export default store;