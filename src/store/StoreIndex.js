import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './Auth';
import expensesReducer from './ExpenseStore'

const store = configureStore({
    reducer:{
        auth:AuthReducer,
        expenses:expensesReducer
    }
})
// store.subscribe(()=>console.log(store.getState().expenses))
export default store;