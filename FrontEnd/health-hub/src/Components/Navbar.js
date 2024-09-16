import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { FaUser } from "react-icons/fa";
import Logout from "./Logout";


const NavBar = () => {
     
    const {auth,setAuth} = useContext(AuthContext);
    const Navigate = useNavigate();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary" >
                {localStorage.getItem('token')?localStorage.getItem('admin')?
                <Link to='/adminHome' className="navbar-brand ms-3" onClick={()=>{setAuth({regiser:true,login:true})}}><h2>Health-Hub</h2></Link>:
                <Link to='/userHome' className="navbar-brand ms-3" onClick={()=>{setAuth({regiser:true,login:true})}}><h2>Health-Hub</h2></Link>:
                
                <Link to='/' className="navbar-brand ms-3" onClick={()=>{setAuth({regiser:true,login:true})}}><h2>Health-Hub</h2></Link>}
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                
                    {localStorage.getItem('token')?<>{
                        <div className="navbar-nav ms-auto ">
                            {localStorage.getItem('admin')?<>
                                {!auth.book?<li className="nav-item text-white"><div className="btn btn-secondary m-2" onClick={()=>{setAuth({book:!auth.book});Navigate('adminhome')}}>Services</div></li>:
                                    <li className="nav-item text-white"><div className="btn btn-secondary m-2" onClick={()=>{setAuth({book:!auth.book});Navigate('adminhome')}}>Appointments</div></li>
                                }
                                <li className="nav-item text-white" ><Link to="/reports" className="btn btn-secondary m-2"><b>Analytics</b></Link></li>
                             <li className="nav-item text-white "><div className="m-2 mt-3 me-5"> <FaUser size={25}/>&nbsp;<span> Admin</span></div></li></> :
                             <li className="nav-item text-white"><Link to="/manager" className="btn btn-outline-light btn-floating m-2"> <FaUser size={25}/>&nbsp;&nbsp;&nbsp; {auth.Name} </Link></li> }
                            <li className="nav-item"><Logout /></li>
                        </div>}
                    </>:<ul className="navbar-nav ms-auto " >
                    <li className="nav-item">{auth.login && <Link to='/login' className="  btn btn-dark text-white m-2" onClick={()=>{setAuth({regiser:true,login:false})}}><b>LogIn</b></Link>}</li>
                    <li className="nav-item">   {auth.regiser && <Link to='/register' className=" btn btn-dark text-white m-2 me-5" onClick={()=>{setAuth({register:false,login:true})}}><b>Register</b></Link>}</li>
                    </ul>}
                
            </nav>
            
        </>
    )
}

export default NavBar;