import React, {useState} from 'react';
import {Stack, FormControl, InputLabel, Select, TextField, MenuItem, Button} from '@mui/material';
import categories from '../categories.json';
import { useDispatch } from 'react-redux';
import { fetchExpenses } from '../app/store/actions/expenseActions';

export default function FilterExpenses(){

    const [fromDate, setFromDate]=useState('');
    const [toDate, setToDate] = useState('');
    const [category, setCategory] = useState('');

    const dispatch = useDispatch();

    function handleApplyFilter(){
        if (fromDate && toDate){
            dispatch(fetchExpenses({fromDate, toDate, category}))
        }else if (fromDate !== ''){
            dispatch(fetchExpenses({fromDate,category}))
        } else if (toDate !== ''){
            dispatch(fetchExpenses({toDate, category}))
        } else {
            dispatch(fetchExpenses({category}))
        }
    }

    return(
        <>
            <h5>Filter</h5>
            <Stack direction='row' spacing={1} sx={{marginBottom:'1em'}}>
                <TextField type='date' value={fromDate} onChange={(e)=>setFromDate(e.target.value)}/>
                <TextField type='date' value={toDate} onChange={(e)=>setToDate(e.target.value)}/>
                <FormControl style={{width:'10em'}}>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="demo-simple-select"
                        label="Category"
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}
                    >
                        <MenuItem value={''}>
                            <span>None</span>
                        </MenuItem>
                        {categories.map((category,index)=>{
                            return(
                                <MenuItem key={index} value={category.Name}>
                                    {category.Name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <Button variant='outlined' onClick={()=>{handleApplyFilter()}}>
                    Apply
                </Button>
            </Stack>
        </>
    )
}