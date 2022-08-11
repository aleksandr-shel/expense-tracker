import { Box, Stack, TextField, Button, CircularProgress } from "@mui/material";
import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
import agent from './../app/api/agent';
import {setUser, setToken, setLoading} from '../app/store/slices/userSlice'
import { closeModal } from "../app/store/slices/modalSlice";

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
export default function Register(){


    const dispatch = useDispatch();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const {loading} = useSelector(state=>state.usersReducer);
    const navigate = useNavigate();

    function handleRegister(e){
        e.preventDefault();
        dispatch(setLoading(true))
        agent.User.register({email, username, password}).then(response=>{
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
            <form onSubmit={handleRegister}>
                <Stack spacing={1}>
                    <h1 style={{textAlign:'center'}}>Register</h1>
                    <TextField type='email' label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <TextField type='text' label="Username" variant="outlined"  value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <TextField type='password' label="Password" variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <Button variant='outlined' type='submit'>{loading ? <CircularProgress /> : <>Register</>}</Button>
                </Stack>
            </form>
        </Box>
    )
}