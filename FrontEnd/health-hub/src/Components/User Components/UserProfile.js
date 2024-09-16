import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ResetPassword from "./ResetPassword";

const UserProfile=()=>{
    const {auth,setAuth} = useContext(AuthContext);
    const [reset, setResest] = useState(false);
    
    useEffect(()=>{
        const fetch =async ()=>{
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
        <div className="container-fluid p-5 " style={{height:"100%"}}>
            <div className="bg-white" style={{height:'100%',width:"100%"}}>
                <h3 className="text-uppercase text-center p-5 " style={{backgroundColor:"silver"}}>User Profile</h3>
                <hr/>
                <div className="row">
                    <div className="col-6 text-center">
                        <h4 className="text-center p-3">Details</h4>
                            <div className="ps-5 p-2 row">
                                <div className="col text-end">
                                    <strong>Name : </strong>
                                </div>
                                <div className="col text-start">
                                    {auth.Name}
                                </div>
                            </div>
                            <div className="ps-5 p-2 row">
                                <div className="col text-end">
                                    <strong>Email : </strong>
                                </div>
                                <div className="col text-start">
                                    {auth.Email}
                                </div>
                            </div>
                            <div className="ps-5 p-2 row">
                                <div className="col text-end">
                                    <strong>Phone Number : </strong>
                                </div>
                                <div className="col text-start">
                                    {auth.PhoneNumber}
                                </div>
                            </div>
                        <div className="text-end p-5">
                        <button className="btn btn-warning" onClick={()=>setResest(!reset)}>
                                Reset Password
                            </button>
                        </div>    
                    </div>
                    <div className="col-6 text-center">
                            {reset && <ResetPassword id={auth.userId} setReset={setResest}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;