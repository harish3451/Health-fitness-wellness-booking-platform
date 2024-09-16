import React  from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute =({component:Component, ...rest})=>{
   
    return localStorage.getItem('token') ? <Component {...rest}/>:<Navigate to="/login"/>;
}

export default ProtectedRoute;