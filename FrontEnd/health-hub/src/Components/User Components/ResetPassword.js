import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from 'yup';

const ResetPassword=({id,setReset})=>{
    const initialValue={
        oldpassword:'',
        password:'',
        confirmPassword:''
    }

    const validationSchema = Yup.object( {
        oldpassword:Yup.string().min(8,"* Length Should be minimun 8 charecters")
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$*&])[A-Za-z\d!@#$*&]{8,16}$/,"* Password Must Contains atleast one uppercase,lowercase, symbol and digit")
        .max(15,"* Password can be maximun 16 characters").required("* Password is reqiered"),
        password:Yup.string().min(8,"* Length Should be minimun 8 charecters")
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$*&])[A-Za-z\d!@#$*&]{8,16}$/,"* Password Must Contains atleast one uppercase,lowercase, symbol and digit")
        .max(15,"* Password can be maximun 16 characters").required("* Password is reqiered"),
        confirmPassword:Yup.string().oneOf([Yup.ref('password')],'Not matching password').required("Required field")
        
    })

    const handleSubmit= async (values)=>{
        console.log("id = "+id,"\nOld password = "+values.oldPassword);
        try{
            
            const response = await axios.post(`http://localhost:5166/api/Auth/resetPassword/${id}`,{
                oldPassword:values.oldpassword,
                newPassword:values.password,
                
            },{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response){
                alert("Password changed Success fully");
                setReset(false);
            }
        }catch(error){
            console.log(error);
            alert("Wrong Passwrod Entered");
        }
    }


    return(
        <div>
            <h3 className="pb-4">Reset password</h3>
            <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                        <div className="form-group mb-3">
                            <div className="row">

                            <label className="form-label col-5 text-end" htmlFor="password">Old Password :</label>
                            <Field type='password' name= "oldpassword" id="oldpassword" className="form-control col" style={{marginRight:"15%"}} placeholder="Old Password"/>
                            <ErrorMessage name="oldpassword" component='div' className="text-danger text-center" style={{fontWeight:"bold"}}/>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <div className="row">

                            <label className="form-label col-5 text-end" htmlFor="password">New Password :</label>
                            <Field type='password' name= "password" id="password" className="form-control col" style={{marginRight:"15%"}} placeholder="New Password"/>
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
                                    <button className="btn btn-dark" type="submit">Reset</button>
                            </div>
                        </div>
                </Form>
            </Formik>
        </div>
    )
}

export default ResetPassword;