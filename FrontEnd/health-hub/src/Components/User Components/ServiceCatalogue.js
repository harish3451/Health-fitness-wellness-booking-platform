import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const ServiceCatalogue=({service})=>{
    const {auth} = useContext(AuthContext);
    const serviceP = service.services.split(',');
    const Navigate = useNavigate();
    
    return(
        <div className="container row rounded m-3 border border-dark" >
            <div className="col-3"> 
                <img src={process.env.PUBLIC_URL+`images/${service.imageName}`} alt={`${service.companyName}`} rounded width={"100%"}/>
            </div>
            <div className="col-6 p-3">
                <h3>{service.companyName}</h3>
                <p><strong>Services :</strong> {serviceP.map(p=>(
                    <span className="rounded ps-1 pe-1 m-1 mt-3 text-white bg-secondary">{p.trim()}</span>
                ))} </p>
                <p>Located at {service.location} in <strong>{service.locationCity}</strong><br/>Contact No. : {service.companyPhone}<br/>Email : {service.companyEmail} </p>

            </div>
            <div className="col-3 pt-3">
                <button className="btn btn-success" onClick={()=>Navigate('/bookappointment',{
                    state:{
                        userEmail:auth.Email,
                        companyName:service.companyName,
                        cat:serviceP
                    }
                })}>Book Appointment</button>
            </div>
        </div>
    )
}

export default ServiceCatalogue;