import { List} from "@mui/material";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchExpenses } from './../app/store/actions/expenseActions';
import ExpenseItem from "./ExpenseItem";
import FilterExpenses from "./FilterExpenses";


export default function ListExpenses(){
    const {expenses} = useSelector(state => state.expenseReducer)
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(fetchExpenses())
    },[dispatch])

    return(
        <>
            <FilterExpenses/>
            <List>
                {expenses.map((expense, index)=>{
                    return(
                        <ExpenseItem key={index} expense={expense}/>
                    )
                })}
            </List>
        </>
    )
}