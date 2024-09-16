import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { AuthContext } from "../Context/AuthContext";
const Register = ()=>{
    const Navigate= useNavigate(); 
    const {setAuth} = useContext(AuthContext);
    const [isRegistered,setIsRegistered] = useState(false);
    const initialValue ={
        name:'',
        phoneNumber:'',
        email :'',
        password:'',
        confirmPassword:''
    }

    const validationSchema = Yup.object( {
        email:Yup.string().email("* Please Enter Correct email Format").matches(/^(?!.*@admin).+$/,"domain cannot be admin").required("* Email is required"),
        password:Yup.string().min(8,"* Length Should be minimun 8 charecters")
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$*&])[A-Za-z\d!@#$*&]{8,16}$/,"* Password Must Contains atleast one uppercase,lowercase, symbol and digit")
        .max(15,"* Password can be maximun 16 characters").required("* Password is reqiered"),
        name:Yup.string().required("* Name required"),
        phoneNumber:Yup.string().min(10).max(10,'10 digit number only').matches(/^\d{10}$/,'* Must be numbers').required("* Phone number is required"),
        confirmPassword:Yup.string().oneOf([Yup.ref('password')],'Not matching password').required("Required field")
        
    })

    const handleSubmit=async (values)=>{
        try{
            
            await axios.post('http://localhost:5166/api/Auth/register',{name:values.name,phoneNumber:values.phoneNumber,email:values.email,password:values.password})
            alert("Registered Success fully");
            setAuth({login:false})
            Navigate('/login');
        }catch(error){
            setIsRegistered(true);
        }
    }

    return(
        <div  className="register">
            <img src={process.env.PUBLIC_URL+"images/doctor.png"} alt="doctorImage" width="30%" style={{float:'left'}}/>      
            <div className="container bg-info bg-opacity-25 " style={{width:"50%",marginTop:"3%",position:'absolute',left:"40%"}}>
                <h2 className="text-center pt-3">Register</h2>
                {isRegistered && <p className="text-center text-light">Email is already registered <Link to="/login">Click here</Link> log in</p>}
                <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className="col-md-12 pt-5">  
                        <div className="form-group mb-3">
                            <div className="row">

                            <label className="form-label col-5 text-end" htmlFor="name">Name :</label>
                            <Field type='text' name= "name" id="name" className="form-control col" style={{marginRight:"15%"}} placeholder=" Name" />
                            <ErrorMessage name="name" component={'div'} className="text-danger text-center" style={{fontWeight:"bold"}}/>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <div className="row">

                            <label className="form-label col-5 text-end" htmlFor="phoneNumber">Phone Number :</label>
                            <Field type='text' name= "phoneNumber" id="phoneNumber" className="form-control col" style={{marginRight:"15%"}} placeholder="Enter phone number" />
                            <ErrorMessage name="phoneNumber" component={'div'} className="text-danger text-center" style={{fontWeight:"bold"}}/>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <div className="row">

                            <label className="form-label col-5 text-end" htmlFor="email">Email :</label>
                            <Field type='text' name= "email" id="email" className="form-control col" style={{marginRight:"15%"}} placeholder="Enter Mail" />
                            <ErrorMessage name="email" component={'div'} className="text-danger text-center" style={{fontWeight:"bold"}}/>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <div className="row">

                            <label className="form-label col-5 text-end" htmlFor="password">Password :</label>
                            <Field type='password' name= "password" id="password" className="form-control col" style={{marginRight:"15%"}} placeholder="Password"/>
                            <ErrorMessage name="password" component='div' className="text-danger text-center" style={{fontWeight:"bold"}}/>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <div className="row">

                            <label className="form-label col-5 text-end" htmlFor="confirmPassword">Confirm Password :</label>
                            <Field type='password' name= "confirmPassword" id="confirmPassword" className="form-control col" style={{marginRight:"15%"}} placeholder="Confirm Password"/>
                            <ErrorMessage name="confirmPassword" component='div' className="text-danger text-center" style={{fontWeight:"bold"}}/>
                            </div>
                        </div>
                        <div className="row container-fluid mb-2">
                            <div className="text-center">
                                    <button className="btn btn-primary" type="submit">Register</button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
export default Register;