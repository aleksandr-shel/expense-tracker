import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./slices/expenseSlice";
import modalSlice from "./slices/modalSlice";
import sampleSlice from "./slices/sampleSlice";
import userSlice from "./slices/userSlice";



const store = configureStore({
    reducer:{
        expenseReducer: expenseSlice.reducer,
        usersReducer: userSlice.reducer,
        modalReducer: modalSlice.reducer,
        sampleReducer: sampleSlice.reducer,
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: false
    })
})


export default store;