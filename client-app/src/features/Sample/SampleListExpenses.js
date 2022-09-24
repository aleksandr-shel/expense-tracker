import { List} from "@mui/material";
import React from "react";
import SampleExpenseItem from "./SampleExpenseItem";


export default function SampleListExpenses({expenses, sum}){
    // const {expenses, sum} = useSelector(state => state.expenseReducer)

    return(
        <div className="appear-animation-top-bottom">
            <div>
                Expense summary: $ {sum}
            </div>
            <List>
                {expenses.map((expense, index)=>{
                    return(
                        <SampleExpenseItem key={index} expense={expense}/>
                    )
                })}
            </List>
        </div>
    )
}