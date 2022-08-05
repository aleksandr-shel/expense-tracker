import { Box, Button, Input, Select, MenuItem, InputLabel, InputBase} from '@mui/material';
import React from 'react';
import categories from '../categories.json'

export default function AddExpenseForm(){

    function handleChangeCategory(){

    }

    return(
        <Box sx={{margin: '1em'}}>
            <Input placeholder='Expense' type='text'/>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                onChange={handleChangeCategory}
            >
                {categories.map((category,index)=>{
                    return(
                        <MenuItem key={index} value={category.Name}>
                            {category.Name}
                        </MenuItem>
                    )
                })}
            </Select>
            <Input type='date'/>
            <Button variant="outlined">
                Add
            </Button>
        </Box>
    )
}