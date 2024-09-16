import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import {  updateService } from "../action/ServiceAction";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateService=()=>{
    const [file,setFile] =useState('');
    const dispatch = useDispatch();
    const [loading,setLoading]=useState(false);
    const location = useLocation();
    const Navigate = useNavigate();
    const { state } = location;
    const service = state.service;
    useEffect(()=>{
        console.log("state : ",state);
    },[state]);

    console.log(state.service);
    const initialValue={
        CompanyName:state.service.companyName,
        CompanyEmail:state.service.companyEmail,
        CompanyPhone:state.service.companyPhone,
        Location:state.service.location,
        LocationCity:state.service.locationCity,
        Specialist:state.service.specialist,
        Type:state.service.type,
        Services:state.service.services,
        ImageName:state.service.imageName
    }

    const validationSchema=Yup.object({
        CompanyName:Yup.string().required("* Mandatory Field"),
        CompanyEmail:Yup.string().email("* Please Enter Correct email Format").matches(/^(?!.*@admin).+$/,"domain cannot be admin").required("* Email is required"),
        CompanyPhone:Yup.string().min(10).max(10,'10 digit number only').matches(/^\d{10}$/,'* Must be numbers').required("* Phone number is required"),
        Location:Yup.string().required("* Enter area"),
        Specialist:Yup.string().required("* Specialist name is required"),
        Services:Yup.string().required("* Mandatory Field"),
        Type:Yup.string().required("Select Type of service"),
        LocationCity:Yup.string().required("Select city")
    })

    const handleSubmit=(values)=>{
        console.log(service);
        service.companyPhone = values.CompanyPhone;
        service.location = values.Location;
        service.specialist = values.Specialist;
        service.services = values.Services;
        console.log(service);
        dispatch(updateService(service.id,service));
        Navigate("/adminHome");
    }

    return(
        <div className="bg-white bg-light pb-5">
            <div>
                <h2 className="text-center mb-2 mt-2">Update Company Details</h2>
            </div>
            <hr></hr>
            <Formik initialValues={initialValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
                <Form className="container">

                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="CompanyName">Company Name</label>
                        <Field className="form-control" id="CompanyName" name="CompanyName" placeholder="Enter Company Name" disabled/>
                        <ErrorMessage name="CompanyName" component={'div'} className="text-danger text-center" style={{fontWeight:"bold"}}/>
                    </div>
                    <div className="row  mb-3">
                        <div className="form-group col-6">
                            <label className="form-label" htmlFor="CompanyPhone">Company Phone</label>
                            <Field className="form-control" id="CompanyPhone" name="CompanyPhone" placeholder="Enter Company Phone number"/>
                            <ErrorMessage name="CompanyPhone" component={'div'} className="text-danger text-center" style={{fontWeight:"bold"}}/>
                        </div>
                        <div className="form-group col-6">
                            <label className="form-label" htmlFor="CompanyEmail">Company Email</label>
                            <Field className="form-control" id="CompanyEmail" name="CompanyEmail" placeholder="Enter Company Email" disabled/>
                            <ErrorMessage name="CompanyEmail" component={'div'} className="text-danger text-center" style={{fontWeight:"bold"}}/>
                        </div>
                    </div>
                    <div className="row  mb-3">
                        <div className="form-group col-6">
                            <label className="form-label" htmlFor="Location">Address</label>
                            <Field className="form-control" id="Location" name="Location" placeholder="Address"/>
                            <ErrorMessage name="Location" component={'div'} className="text-danger text-center" style={{fontWeight:"bold"}}/>
                        </div>
                        <div className="form-group col-6">
                            <label className="form-label" htmlFor="LocationCity">City</label>
                            <Field as="select" className="form-control col" id="LocationCity" name="LocationCity" disabled>
                                <option value={""}>Select City</option>
                            <option value={'Vijayawada'}>Vijayawada</option>
                            <option value={"Hyderabad"}>Hyderabad</option>
                            <option value={"Ahmedabad"}>Ahmedabad</option>
                            <option value={"Jodhpur"}>Jodhpur</option>
                            <option value={"Mumbai"}>Mumbai</option>
                            </Field>
                            <ErrorMessage name="LocationCity" component={'div'} className="text-danger text-center" style={{fontWeight:"bold"}}/>
                        </div>
                    </div>
                    <div className="row  mb-3">
                        <div className="form-group col-6">
                            <label className="form-label" htmlFor="Specialist">Specialist</label>
                            <Field className="form-control" id="Specialist" name="Specialist" placeholder="Specialist name"/>
                            <ErrorMessage name="Specialist" component={'div'} className="text-danger text-center" style={{fontWeight:"bold"}}/>
                        </div>
                        <div className="form-group col-6">
                            <label className="form-label" htmlFor="Services">Services</label>
                            <Field className="form-control" id="Services" name="Services" placeholder="Services"/>
                            <ErrorMessage name="Services" component={'div'} className="text-danger text-center" style={{fontWeight:"bold"}}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="form-group col-6">
                            <label className="form-label" htmlFor="Type">Type</label>
                            <Field as="select" className="form-control col" id="Type" name="Type" disabled>
                            <option value={''}>Select Type </option>
                            <option value={'Medical'}>Medical</option>
                            <option value={"Fitness"}>Fitness</option>
                            <option value={"Wellness"}>Wellness</option>
                            </Field>
                            <ErrorMessage name="Type" component={'div'} className="text-danger text-center" style={{fontWeight:"bold"}}/>
                        </div>
                        
                    </div>
                    
                    <button Type="submit" className="btn btn-success">Update</button>
                    
                </Form>
            </Formik>
            {loading && <>
                <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only"></span>
                        </div>
                </div>
            </>}
                
        </div>
    )
}

export default UpdateService;