import {createSlice} from '@reduxjs/toolkit';

const initialState= {
    expenses: [],
    loading: false,
    expensesForPieChart: [],
    sum: 0,
}

const groupExpenses2 = (expenses) => {

    //expenses = expenses.map((ex)=>({name: ex.category.name, value: new Number(ex.amount)}))

    //categorize expenses
    return Object.entries(
        expenses.reduce((exs, ex)=>{
            const category = ex.categoryName;
            exs[category] = exs[category] ? [...exs[category], ex] : [ex]; 
            return exs;
        }, {})
    );
}


const sampleSlice = createSlice({
    name:'expenses',
    initialState,
    reducers:{
        setSampleExpenses: (state, action)=>{
            state.expenses = action.payload;

            state.sum = state.expenses.map(x => x.amount).reduce((prev,next)=> prev+next)
        },
        setSampleLoading: (state, action)=>{
            state.loading = action.payload;
        },
        addSampleExpense: (state, action)=>{
            console.log(action.payload)
            state.expenses.push(action.payload)
            state.sum = state.expenses.map(x => x.amount).reduce((prev,next)=> prev+next)
        },
        deleteSampleExpense:(state, action)=>{
            const id = action.payload;
            state.expenses = state.expenses.filter(ex => ex.id !== id);
            if (state.expenses.length !== 0){
                state.sum = state.expenses.map(x => x.amount).reduce((prev,next)=> prev+next)
            }
        },
        setSampleExpensesForPieChart:(state,action)=>{
            // const tempExpenses = action.payload;
            state.expensesForPieChart = [];
            let expensesCategorized = groupExpenses2(state.expenses);
            expensesCategorized.forEach((categorizedExpense)=>{
                state.expensesForPieChart.push({name:categorizedExpense[0], value: categorizedExpense[1].map(item => item.amount).reduce((prev,next)=> prev+next)})
            })
        },
        updateSampleExpense: (state,action)=>{
            const {id} = action.payload;
            state.expenses = state.expenses.map(ex=>{
                return ex.id === id ? action.payload : ex;
            })
            state.sum = state.expenses.map(x => x.amount).reduce((prev,next)=> prev+next)
        }
    }
})

export const {updateSampleExpense, setSampleExpenses, setSampleLoading, addSampleExpense, setSampleExpensesForPieChart, deleteSampleExpense} = sampleSlice.actions

export default sampleSlice;

