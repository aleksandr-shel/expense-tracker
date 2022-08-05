import React from 'react';
import PieChartComponent from '../features/PieChartComponent';
import TableComponent from '../features/TableComponent';
import Box from '@mui/material/Box';
import AddExpenseForm from '../features/AddExpenseForm';
function App() {
  return (
    <Box sx={{display:'flex', flexWrap:'wrap', marginTop:'1em', marginRight: '5em', marginLeft:'5em'}}>
        <Box sx={{display:'flex',justifyContent:'center', flex:'1', margin:'1em'}}>
          <PieChartComponent/>
        </Box>
        <Box sx={{flex:'1', margin:'1em'}}>
          <AddExpenseForm/>
          <TableComponent/>
        </Box>
    </Box>
  );
}

export default App;
