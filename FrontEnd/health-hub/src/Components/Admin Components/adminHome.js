import React, { useContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./Services/store/Store";
import ServiceList from "./Services/components/ServiceList";
import Bookings from "./Booking/Bookings";
import { AuthContext } from "../../Context/AuthContext";
import '../style/Style.css'
import { Outlet } from "react-router-dom";

const AdminHome=({book})=>{
    

    const {auth,setAuth} = useContext(AuthContext);
    
    return(
        <div className="adminhome">
               {auth.book ?<ServiceList />:
                <Bookings/>}

                {!auth.book &&<Outlet/>}
        </div>
    )
}

export default AdminHome;