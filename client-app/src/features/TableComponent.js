import React, { useEffect } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from './../app/store/actions/expenseActions';




export default function TableComponent(){

    const {expenses} = useSelector(state => state.expenseReducer)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchExpenses())
    },[dispatch])

    return(
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell component='th' align='center'>Expense</TableCell>
                    <TableCell component='th' align='center'>Category</TableCell>
                    <TableCell component='th' align='center'>Amount</TableCell>
                    <TableCell component='th' align='center'>Date</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {expenses.map((expense) => (
                    <TableRow
                    key={expense.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align='center'>
                            {expense.name}
                        </TableCell>
                        <TableCell align='center'>{expense.category.name}</TableCell>
                        <TableCell align='center'>{expense.amount}</TableCell>
                        <TableCell align='center'>{expense.date.split('T')[0]}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}