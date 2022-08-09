import React from 'react';
import PieChartComponent from '../features/PieChartComponent';
import Box from '@mui/material/Box';
import AddExpenseForm from '../features/AddExpenseForm';
import ListExpenses from '../features/ListExpenses';
import {Routes, Route} from 'react-router-dom';
import HomePage from '../features/HomePage';
import {Link} from 'react-router-dom'
import ProtectedRoute from '../features/ProtectedRoute';
import ModalComponent from '../features/ModalComponent';

function App() {
  return (
    <>
      <ModalComponent/>
      <Routes>
        <Route exact path='/' element={<HomePage/>} />
        <Route path='/expense-tracker' element={
          <ProtectedRoute>
            <Box sx={{display:'flex', flexWrap:'wrap',marginRight: '5em', marginLeft:'5em'}}>
                <Box sx={{display:'flex',justifyContent:'center', flex:'1', margin:'1em'}}>
                  <PieChartComponent/>
                </Box>
                <Box sx={{flex:'2', margin:'1em'}}>
                  <AddExpenseForm/>
                  <ListExpenses/>
                </Box>
            </Box>
          </ProtectedRoute>
        }/>
        <Route path="*" element=
        {<>
          <p>There's nothing here: 404!</p>
          <Link to='/'>Go Home</Link>
        </>}/>
      </Routes>
    </>
  );
}

export default App;
