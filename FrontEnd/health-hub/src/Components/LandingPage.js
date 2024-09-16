 import React, { useContext } from "react";
import './style/Style.css'
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

 const LandingPage=()=>{
    const {setAuth} = useContext(AuthContext);
    return (
        <>        <div className="layout" style={{height:'89vh'}}>
            <div className="row justify-content-end " style={{paddingTop:'10%'}}>
                <div className="col-6">
                    <h1>Online Booking Plaform For Health and Wellness</h1>
                    <p className="col-5 text-white m-5" style={{fontSize:'1.4vw'}}>
                        Now you can book 
                        Various health,  fitness and
                        Wellness related
                        services in out website
                    </p>
                </div>
            <div className="col-1"> </div>
            </div>
        </div>
        <div className="container-fluid">
            <div style={{width:'70%',marginLeft:'auto',marginRight:'auto',padding:'5%',textAlign:'center'}}>

            <p style={{fontSize:"4vw"}}>Book You Appointment Now</p>
            <p style={{fontSize:"2vw",marginTop:'2%'}}>Click belove to Book Appointment</p>
            <div>
                {localStorage.getItem('token')?
                
                <Link to='/userHome' onClick={()=>{setAuth({login:true,register:false})}}><span className="btn btn-primary" style={{fontSize:'2vw',borderRadius:'100px'}}>Book Now</span></Link>
                :   
                <Link to='/login' onClick={()=>{setAuth({login:true,register:false})}}><span className="btn btn-primary" style={{fontSize:'2vw',borderRadius:'100px'}}>Book Now</span></Link>
            }
            </div>
            </div>
        </div>
        </>

    )
 }

 export default LandingPage;