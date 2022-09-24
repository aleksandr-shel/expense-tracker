
import { setSampleLoading,addSampleExpense, setSampleExpensesForPieChart, deleteSampleExpense, updateSampleExpense} from '../slices/sampleSlice';
import { v4 as uuidv4 } from 'uuid';

export function fetchExpenses(params){
    return async (dispatch)=>{
        dispatch(setSampleLoading(true))
        dispatch(setSampleExpensesForPieChart())
        dispatch(setSampleLoading(false))
    }
}


export function addExpenseAction(expense){
    return async (dispatch)=>{
        expense.id = uuidv4();
        dispatch(addSampleExpense(expense))
        dispatch(setSampleExpensesForPieChart())
        
    }
}


export function deleteExpenseAction(id){
    return async (dispatch)=>{
        dispatch(deleteSampleExpense(id))
        dispatch(setSampleExpensesForPieChart())
    }
}

export function updateExpenseAction(id, expense){
    return async(dispatch)=>{
        dispatch(updateSampleExpense(expense))
        dispatch(setSampleExpensesForPieChart())
    }
}