import React, { useState } from "react";
import { FaCalendar, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar=()=>{
    const [active,setActive]=useState(true);
    return(
        <div className="bg-light md-float-left" style={{height:"90vh",width:"100%"}}>
            <h2 className="text-center pt-5" >Menu</h2>
            <hr/>
            <div className=" mt-3">
                <div className="text-center">
                    {active?<Link to="" className="btn btn-primary w-50 text-white" onClick={()=>setActive(!active)}><FaUser/>&nbsp; User Profile</Link>:
                    <Link to="" className="btn btn-outline-secondary w-50 " onClick={()=>setActive(!active)}><FaUser/>&nbsp; User Profile</Link>}
                </div>
                <div className="text-center">
                    {active?<Link to="appointment" className="btn btn-outline-secondary w-50 mt-2" onClick={()=>setActive(!active)}><FaCalendar/> Appointments</Link>:
                        <Link to="appointment" className="btn btn-primary w-50 mt-2" onClick={()=>setActive(!active)}><FaCalendar/> Appointments</Link>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;