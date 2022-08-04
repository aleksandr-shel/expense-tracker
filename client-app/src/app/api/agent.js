import axios from "axios";
import store from './../store/index';
import { toast } from 'react-toastify';

axios.interceptors.request.use(config=>{
    const token = store.getState().users.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use( async response=>{
    return response;
}, (error)=>{
    const {status} = error.response;
    switch(status){
        case 400:
            toast.error('bad request')
        case 401:
            toast.error('unautorized');
            break;
        case 404:
            toast.error('not found')
            break;
        case 500:
            toast.error('server error')
            break;
    }
    return Promise.reject(error);
})


const responseBody = (response)=> response.data;

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody),
}


const User = {
    login: (user)=> requests.post('/api/users/login', user),
    register: (user)=> requests.post('/api/users/register', user),
    getCurrent: ()=> requests.get('/api/users/current')
}

const Expense = {
    list: () => requests.get('/api/expense'),
    delete: (id)=>requests.delete(`/api/expense/${id}`),
}


const agent = {
    User
}

export default agent;