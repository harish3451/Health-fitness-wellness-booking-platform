import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";

const UserManager = ()=>{

    const {setAuth} = useContext(AuthContext);

    useEffect( ()=>{
        const fetch = async()=>{
            try {
                const response = await axios.get("http://localhost:5166/api/Auth/profile",{
                    headers:{
                        'Authorization':`Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                setAuth({
                    userId:response.data.id,
                    
                    Name : response.data.name,
                    Email : response.data.email,
                    PhoneNumber : response.data.phoneNumber,
                    token:response.data.token,
                    login:false,
                    register:false
                })
                
            } catch (error) {
                console.error(error);
            }
        };
        fetch();
    },[setAuth])
    return(
        <div className="userManager" style={{overflow:"inherit"}}>
            <div className="row">
                <div className="col-md-3">

                    <Sidebar/>
                </div>
                <div className="col">

                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default UserManager;