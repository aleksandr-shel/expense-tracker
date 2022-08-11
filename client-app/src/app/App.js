import React, { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from '../features/HomePage';
import {Link} from 'react-router-dom'
import ProtectedRoute from '../features/ProtectedRoute';
import ModalComponent from '../features/ModalComponent';
import { useDispatch } from 'react-redux';
import { setToken } from './store/slices/userSlice';
import { currentUser } from './store/actions/userActions';
import ExpensesDashboard from '../features/ExpensesDashboard';

function App() {

  const dispatch = useDispatch();
  
  useEffect(()=>{
    const tokenHere = window.localStorage.getItem('expense-tracker-token')
    if (tokenHere){
      dispatch(setToken(tokenHere))
      dispatch(currentUser())
    }
  },[dispatch])

  return (
    <>
      <ModalComponent/>
      <Routes>
        <Route exact path='/' element={<HomePage/>} />
        <Route path='/expense-tracker' element={
          <ProtectedRoute>
            <ExpensesDashboard/>
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
