import React from 'react';
import PieChartComponent from '../features/PieChartComponent';
import TableComponent from '../features/TableComponent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
function App() {
  return (
    <Box>
      <Grid container spacing={2}>
          <Grid item xs={12}>
            
          </Grid>
          <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
            <PieChartComponent/>
          </Grid>
          <Grid item xs={6}>
            <TableComponent/>
          </Grid>
      </Grid>
    </Box>
  );
}

export default App;
