import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,

});

export const login = async (FormData)=>{
    console.log(FormData,"api call login");
    try {
        const {data} = await API.post('/users/login', FormData);
        console.log(data);
        return data?.data;
        
    } catch (error) {
        console.log(error);
        throw error?.response?.data;
    }
};

export const logout = async()=>{
    try {
        const {data} = await API.post('/users/logout');
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;
    }
};

export const getCurrentUser = async()=>{
    try {
        const {data} = await API.get('/users/current-user');
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;

    }
}