
import { setExpenses, setLoading,addExpense, setExpensesForPieChart, deleteExpense, updateExpense} from '../slices/expenseSlice';
import agent from './../../api/agent';


export function fetchExpenses(params){
    return async (dispatch)=>{
        dispatch(setLoading(true))
        const expenses = await agent.Expense.list(params)
        dispatch(setExpenses(expenses))
        dispatch(setExpensesForPieChart())
        dispatch(setLoading(false))
    }
}


export function addExpenseAction(expense){
    return async (dispatch)=>{
        agent.Expense.add(expense).then(
            result=>{
                dispatch(addExpense(result))
                dispatch(setExpensesForPieChart())
            }
        )
    }
}


export function deleteExpenseAction(id){
    return async (dispatch)=>{
        agent.Expense.delete(id).then(()=>{
            dispatch(deleteExpense(id))
            dispatch(setExpensesForPieChart())
        })
    }
}

export function updateExpenseAction(id, expense){
    return async(dispatch)=>{
        agent.Expense.update(id, expense).then((expense)=>{
            dispatch(updateExpense(expense))
            dispatch(setExpensesForPieChart())
        })
    }
}