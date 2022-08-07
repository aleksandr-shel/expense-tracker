import React, {useState, useEffect} from "react";
import { Stack, TextField, FormControl, Input, Select, InputLabel, Button, MenuItem } from '@mui/material';
import {useDispatch} from 'react-redux'
import { updateExpenseAction } from "../app/store/actions/expenseActions";
import categories from '../categories.json';
import CloseIcon from '@mui/icons-material/Close';

export default function UpdateExpenseForm({expense, setEdit}){

    const [expenseName, setExpenseName] = useState(expense.name);
    const [expenseNameError, setExpenseNameError]=useState(false);
    const [amount, setAmount] = useState(expense.amount);
    const [date, setDate] = useState(expense.date.split('T')[0]);
    const [categoryName, setCategoryName] = useState(expense.category.name);
    const [categoryNameError, setCategoryNameError] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        //empty error handling
        setTimeout(()=>{
            setCategoryNameError(false);
            setExpenseNameError(false);
        },3500)
    },[categoryNameError, expenseNameError])

    function handleUpdateButtonClick(id){
        // console.log({expenseName, amount, date, categoryName})
        if (categoryName !=='' && expenseName !==''){
            dispatch(updateExpenseAction(id,{expenseName, amount, date, categoryName}))
            setEdit(false);
        } else {
            if (categoryName === ''){
                setCategoryNameError(true);
            }
            if (expenseName === ''){
                setExpenseNameError(true);
            }
        }
    }

    return(
        <Stack direction='row' spacing={1} sx={{marginBottom:'1em'}}>
            <TextField type='text'  label="Description"
                value={expenseName}
                error={expenseNameError}
                onChange={(e)=>setExpenseName(e.target.value)}/>
            <TextField
                type='number'
                value={amount}
                label='Amount'
                InputProps={{inputProps:{min:1}}}
                onChange={(e)=>{
                    e.target.value = e.target.value < 0 ? (e.target.value = 0) : e.target.value
                    setAmount(e.target.value)
                }}
            />
            <FormControl style={{width:'10em'}}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="demo-simple-select"
                    label="Category"
                    value={categoryName}
                    onChange={(e)=>setCategoryName(e.target.value)}
                    error={categoryNameError}
                >
                    {categories.map((category,index)=>{
                        return(
                            <MenuItem key={index} value={category.Name}>
                                {category.Name}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <Input type='date'
                value={date}
                onChange={(e)=>setDate(e.target.value)}
            />
            <Button variant="outlined" onClick={()=>handleUpdateButtonClick(expense.id)}>
                Update
            </Button>
            <Button onClick={()=>setEdit(false)}>
                <CloseIcon/>
            </Button>
        </Stack>
    )
}