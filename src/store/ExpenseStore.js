import { createSlice } from "@reduxjs/toolkit";


const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses:[],
    totalAmount:0,
    themeToggle:false,
    theme:false,
    showActivePremium:true
},
  reducers: {
    AddExpense(state, action) {
      const newExpense = action.payload;
      state.expenses.push({ 
        id:newExpense.id,
        amount: newExpense.amount,
        description: newExpense.description,
        category: newExpense.category,
    });
      state.totalAmount += newExpense.amount;
    },
    deleteorEditExpense(state, action) {
        const expInd = state.expenses.findIndex(exp=>exp.id === action.payload.id)
        if(action.payload.name === "edit"){
            state.totalAmount=(state.totalAmount+action.payload.edited.amount)-state.expenses[expInd].amount
            state.expenses[expInd] = {
                id:action.payload.id,
                amount:action.payload.edited.amount,
                description:action.payload.edited.description,
                category:action.payload.edited.category
            }
        }else{
            state.totalAmount-=state.expenses[expInd].amount
            state.expenses.splice(expInd,1)
        }
    },
    themeToggle(state){
        state.themeToggle = true
    },
    theme(state){
        state.theme = !state.theme
    },
    onLogoutDeleteExpences(state){
        state.expenses = []
        state.totalAmount = 0
    }
  },
});

export const expenseActions = expensesSlice.actions;

export default expensesSlice.reducer;
