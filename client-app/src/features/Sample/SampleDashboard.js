import React from 'react';
import {Box} from '@mui/material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AddSampleExpense from './AddSampleExpense';
import SampleListExpenses from './SampleListExpenses';
import SamplePieChart from './SamplePieChart';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../app/store/slices/modalSlice';
import Login from '../Login';
import Register from '../Register';



export default function SampleDashboard(){

    const dispatch = useDispatch();
    const {expenses, sum, expensesForPieChart} = useSelector(state => state.sampleReducer);
    const navigate = useNavigate();

    return(
        <>
            <Box sx={{width:'100vw', display:'flex', justifyContent:'end'}}>
                <Button variant='outlined' sx={{margin:'1em'}} onClick={()=>navigate('/')}>
                    Home Page
                </Button>
                <Button variant='outlined' sx={{margin:'1em'}} onClick={()=>dispatch(openModal(<Login/>))}>
                    Login
                </Button>
                <Button variant='outlined' sx={{margin:'1em'}} onClick={()=>dispatch(openModal(<Register/>))}>
                    Register
                </Button>
            </Box>
            {
                expenses.length !== 0 ?
                <>
                    <Box sx={{display:'flex', flexWrap:'wrap',marginRight: '5em', marginLeft:'5em'}}>
                        <Box sx={{display:'flex',justifyContent:'center', flex:'1', margin:'1em'}}>
                            <SamplePieChart expensesForPieChart={expensesForPieChart}/>
                        </Box>
                        <Box sx={{flex:'2', margin:'1em'}}>
                            <AddSampleExpense/>
                            <SampleListExpenses expenses={expenses} sum={sum}/>
                        </Box>
                    </Box>
                </>
                :
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100vw', height:'50vh'}}>
                    <AddSampleExpense/>
                </div>
            }
        </>
    )
}