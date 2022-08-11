import React, {useEffect} from 'react';
import {Box, Typography} from '@mui/material';
import PieChartComponent from './PieChartComponent';
import AddExpenseForm from './AddExpenseForm';
import ListExpenses from './ListExpenses';
import { Button } from '@mui/material';
import { logout } from '../app/store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../app/store/actions/expenseActions';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function ExpensesDashboard(){

    const dispatch = useDispatch();
    const {expenses} = useSelector(state => state.expenseReducer);
    const {user} = useSelector(state => state.usersReducer);

    function handleLogout(){
        dispatch(logout())
    }

    useEffect(()=>{
        dispatch(fetchExpenses())
    },[dispatch])

    return(
        <>
            <Box sx={{width:'100vw', display:'flex', justifyContent:'end'}}>
                <PersonOutlineIcon sx={{margin:'auto 0'}} color="primary"/>
                <Typography color="primary" variant="h6" gutterBottom component="div" sx={{margin:'auto 0'}}>
                    {user.username}
                </Typography>
                <Button sx={{margin:'1em'}} onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
            {
                expenses.length !== 0 ?
                <>
                    <Box sx={{display:'flex', flexWrap:'wrap',marginRight: '5em', marginLeft:'5em'}}>
                        <Box sx={{display:'flex',justifyContent:'center', flex:'1', margin:'1em'}}>
                            <PieChartComponent/>
                        </Box>
                        <Box sx={{flex:'2', margin:'1em'}}>
                            <AddExpenseForm/>
                            <ListExpenses/>
                        </Box>
                    </Box>
                </>
                :
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100vw', height:'50vh'}}>
                    <AddExpenseForm/>
                </div>
            }
        </>
    )
}