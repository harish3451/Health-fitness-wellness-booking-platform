import React from "react";
import { useDispatch } from "react-redux";
import { deleteService } from "../action/ServiceAction";
import { useNavigate } from "react-router-dom";
const ServiceComp=({service})=>{
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const handleDelete=()=>{
        dispatch(deleteService(service.id))
    }

    const handleUpdate=()=>{
        Navigate('/updateService',{
            state:{
                service:service,
            }
        });
    }

    return(
        <div className="col pb-5">
            <div className="card h-100">
                <img src={process.env.PUBLIC_URL+`images/${service.imageName}`} alt={`${service.companyName}`} rounded style={{width:"100%",height:"200px",objectFit:'cover'}}/>
                <div className="card-body">
                    <h5 className="card-title">{service.companyName}</h5>
                    <p className="card-text">Specialist : {service.specialist}</p>
                    <p>We are specialist in {service.services} services .<br/>Located at {service.location} in {service.locationCity}.<br/>Contact number : {service.companyPhone}<br/>Mail Address : {service.companyEmail}</p>
                </div>
                <div className="card-footer">
                    <button className="btn btn-warning m-2" onClick={handleUpdate} >Edit Details</button>
                    <button className="btn btn-danger m-2" onClick={handleDelete} >Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ServiceComp;