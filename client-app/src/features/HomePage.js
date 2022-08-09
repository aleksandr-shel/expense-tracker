import { Box, Button, Stack} from '@mui/material';
import React from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../app/store/slices/modalSlice';
import Login from './Login';
import Register from './Register';

const homePageTheme = createTheme({
    palette:{
        primary:{
            main: '#ffffff'
        }

    }
})

export default function HomePage(){

    const {user} = useSelector(state=>state.usersReducer);

    const dispatch = useDispatch();

    return(
        <ThemeProvider theme={homePageTheme}>
            <Box className='home-page'>
                <div>
                    <h1 style={{color:'white'}}>
                        Expense Tracker
                    </h1>
                    {
                        user === null ?
                        <Stack direction='row' spacing={'auto'}>
                            <Button variant='outlined' onClick={()=>dispatch(openModal(<Login/>))}>
                                Login
                            </Button>
                            <Button variant='outlined' onClick={()=>dispatch(openModal(<Register/>))}>
                                Register
                            </Button>
                        </Stack>
                        :
                        <Stack sx={{marginTop:"1em"}}>
                            <Button component={Link} to='expense-tracker' variant='outlined'>
                                GO TO TRACKER
                            </Button>
                        </Stack>
                    }
                    <Stack sx={{marginTop:"1em"}}>
                        <Button component={Link} to='expense-tracker' variant='outlined'>
                            GO TO TRACKER
                        </Button>
                    </Stack>
                </div>
            </Box>
        </ThemeProvider>
    )
}