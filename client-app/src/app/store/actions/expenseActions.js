
import { setExpenses, setLoading,addExpense, setExpensesForPieChart, deleteExpense} from '../slices/expenseSlice';
import agent from './../../api/agent';


export function fetchExpenses(){
    return async (dispatch)=>{
        dispatch(setLoading(true))
        const expenses = await agent.Expense.list()
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