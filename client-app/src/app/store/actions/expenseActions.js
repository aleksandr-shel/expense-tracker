
import { setExpenses, setLoading} from '../slices/expenseSlice';
import agent from './../../api/agent';


export function fetchExpenses(){
    return async (dispatch)=>{
        dispatch(setLoading(true))
        const expenses = await agent.Expense.list()
        console.log(expenses);
        dispatch(setExpenses(expenses))
        dispatch(setLoading(false))
    }
}