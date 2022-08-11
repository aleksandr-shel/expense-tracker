import agent from "../../api/agent"
import { setToken, setUser } from "../slices/userSlice"


//don't use
export function login(user) {
    return async(dispatch)=>{
        const response = await agent.User.login(user);
        dispatch(setToken(response.token));
        dispatch(setUser(response))
    }
}

//don't use
export function register(user){
    return async (dispatch)=>{
        const response = await agent.User.register(user)
        dispatch(setToken(response.token));
        dispatch(setUser(response))
    }
}


export function currentUser(){
    return async(dispatch)=>{
        const response = await agent.User.getCurrent();
        dispatch(setToken(response.token));
        dispatch(setUser(response))
    }
}