import React, { useState} from "react";
import { Box, Stack, TextField, Button, CircularProgress, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
import agent from './../app/api/agent';
import {setUser, setToken, setLoading} from '../app/store/slices/userSlice'
import { closeModal, openModal } from "../app/store/slices/modalSlice";
import Register from "./Register";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
export default function Login(){

    const dispatch = useDispatch();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {loading} = useSelector(state=>state.usersReducer);
    const navigate = useNavigate();

    function handleLogin(e){
        e.preventDefault();
        dispatch(setLoading(true))
        agent.User.login({email, password}).then(response=>{
            dispatch(setUser(response))
            dispatch(setToken(response.token))
            dispatch(closeModal())
            dispatch(setLoading(false))
            navigate('/expense-tracker')
        }).catch(err=>{
            dispatch(setLoading(false))
            console.log(err);
        })
    }


    return(
        <Box sx={style}>
            <form onSubmit={handleLogin}>
                <Stack spacing={1}>
                    <h1 style={{textAlign:'center'}}>Login</h1>
                    <TextField type='email' label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <TextField type='password' label="Password" variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <Button variant='outlined' type='submit'>{loading ? <CircularProgress /> : <>Login</>}</Button>
                    <Link style={{margin:'auto', cursor:'pointer'}} onClick={()=>dispatch(openModal(<Register/>))}>Don't have an account? Register here</Link>
                </Stack>
            </form>
        </Box>
    )
}