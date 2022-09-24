import {Button, Input, Select, MenuItem, InputLabel, Stack, FormControl, TextField} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addExpenseAction } from '../../app/store/actions/sampleActions';
import categories from '../../categories.json'

export default function AddSampleExpense(){

    const [expenseName, setExpenseName] = useState('');
    const [expenseNameError, setExpenseNameError]=useState(false);
    const [amount, setAmount] = useState(1);
    const [date, setDate] = useState(()=>{
        let date = new Date()
        const offset = date.getTimezoneOffset()
        date = new Date(date.getTime() - (offset * 60 * 1000))
        return date.toISOString().split('T')[0]
    });
    const [categoryName, setCategoryName] = useState('');
    const [categoryNameError, setCategoryNameError] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        //empty error handling
        setTimeout(()=>{
            setCategoryNameError(false);
            setExpenseNameError(false);
        },3500)
    },[categoryNameError, expenseNameError])

    function handleAddButtonClick(){
        // console.log({expenseName, amount, date, categoryName})
        if (categoryName !=='' && expenseName !==''){
            dispatch(addExpenseAction({expenseName, amount: Number(amount), date, categoryName}))
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
        <div className='appear-animation-scale'>
            <h5>Add Expense</h5>
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
                <Button variant="outlined" onClick={handleAddButtonClick}>
                    Add
                </Button>
            </Stack>
        </div>
    )
}