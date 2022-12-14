import { List} from "@mui/material";
import React from "react";
import ExpenseItem from "./ExpenseItem";
import FilterExpenses from "./FilterExpenses";


export default function ListExpenses({expenses, sum}){
    // const {expenses, sum} = useSelector(state => state.expenseReducer)

    return(
        <div className="appear-animation-top-bottom">
            <FilterExpenses/>
            <div>
                Expense summary: $ {sum}
            </div>
            <List>
                {expenses.map((expense, index)=>{
                    return(
                        <ExpenseItem key={index} expense={expense}/>
                    )
                })}
            </List>
        </div>
    )
}