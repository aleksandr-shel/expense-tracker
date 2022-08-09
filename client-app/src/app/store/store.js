import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./slices/expenseSlice";
import modalSlice from "./slices/modalSlice";
import userSlice from "./slices/userSlice";



const store = configureStore({
    reducer:{
        expenseReducer: expenseSlice.reducer,
        usersReducer: userSlice.reducer,
        modalReducer: modalSlice.reducer,
    }
})


export default store;