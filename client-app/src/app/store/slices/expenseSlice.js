import {createSlice} from "@reduxjs/toolkit";

const initialState= {
    expenses: [],
    loading: false,
    expensesForPieChart: [],
    sum: 0,
}

const groupExpenses = (expenses) => {

    //expenses = expenses.map((ex)=>({name: ex.category.name, value: new Number(ex.amount)}))

    //categorize expenses
    return Object.entries(
        expenses.reduce((exs, ex)=>{
            const category = ex.category.name;
            exs[category] = exs[category] ? [...exs[category], ex] : [ex]; 
            return exs;
        }, {})
    );
}


const expenseSlice = createSlice({
    name:'expenses',
    initialState,
    reducers:{
        setExpenses: (state, action)=>{
            state.expenses = action.payload;

            state.sum = state.expenses.map(x => x.amount).reduce((prev,next)=> prev+next)
        },
        setLoading: (state, action)=>{
            state.loading = action.payload;
        },
        addExpense: (state, action)=>{
            state.expenses.push(action.payload)
            state.sum = state.expenses.map(x => x.amount).reduce((prev,next)=> prev+next)
        },
        deleteExpense:(state, action)=>{
            const id = action.payload;
            state.expenses = state.expenses.filter(ex => ex.id !== id);
            if (state.expenses.length !== 0){
                state.sum = state.expenses.map(x => x.amount).reduce((prev,next)=> prev+next)
            }
        },
        setExpensesForPieChart:(state,action)=>{
            // const tempExpenses = action.payload;
            state.expensesForPieChart = [];
            let expensesCategorized = groupExpenses(state.expenses);
            expensesCategorized.forEach((categorizedExpense)=>{
                state.expensesForPieChart.push({name:categorizedExpense[0], value: categorizedExpense[1].map(item => item.amount).reduce((prev,next)=> prev+next)})
            })
        },
        updateExpense: (state,action)=>{
            const {id} = action.payload;
            state.expenses = state.expenses.map(ex=>{
                return ex.id === id ? action.payload : ex;
            })
            state.sum = state.expenses.map(x => x.amount).reduce((prev,next)=> prev+next)
        }
    }
})

export const {updateExpense, setExpenses, setLoading, addExpense, setExpensesForPieChart, deleteExpense} = expenseSlice.actions

export default expenseSlice;