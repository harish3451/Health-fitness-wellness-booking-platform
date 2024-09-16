import React from "react";
import axios from "axios";

const instance = axios.create({
    baseURL:"http://localhost:5166/api/Auth",
});

instance.interceptors.request.use(
    config=>{
        const token=localStorage.getItem('token');
        if(token){
            config.headers['Authorization']=`Bearer ${token}`;
        }
        return config;
    },

    error=>{
        return Promise.reject(error);
    }
)

export default instance; 