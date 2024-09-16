import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchService } from "../action/ServiceAction";
import ServiceComp from "./ServiceComp";
const ServiceList=()=>{
    const Navigate = useNavigate();
    const [add,setAdd] = useState(false);
    // const [update,setUpdate] = useState(false);
    const dispatch = useDispatch();
    const services = useSelector(state=>state);
    useEffect(()=>{
         dispatch(fetchService());
         console.log("service",services);
    },[dispatch])

    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <h4 className="p-5" >Company with Services</h4>
                </div>
                <div className="col-6 text-center">
                    {!add?<button className="m-5 btn btn-primary" onClick={()=>{setAdd(!add);Navigate('AddCompany')}}>Add New Company</button>
                    :<button className="m-5 btn btn-primary" onClick={()=>{setAdd(!add);Navigate('')}}>Back to List</button>}
                </div>
            </div>

            <div className="container ">
                {add   ?<Outlet/>:
                <>
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                    {services && services.map(service=>(
                            <ServiceComp service={service} key={service.id}/>
                            
                        ))}
                        </div>
                </>
                }
            </div>
        </div>
    )
}

export default ServiceList;