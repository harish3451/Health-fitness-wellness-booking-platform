import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";


// import image from 'C:\\Capstone Project\\FrontEnd\\health-hub\\public\\Images\\doctor.png';
const Login = ()=>{
    const [invalidCred,setInvalidCred] = useState(false);
    const {setAuth} = useContext(AuthContext);
    const Navigate = useNavigate();
    const initialValue ={
        email :'',
        password:''
    }

    const validationSchema = Yup.object( {
        email:Yup.string().email("* Please Enter Correct email Format").required("* Email is required"),
        password:Yup.string().min(8,"* Length Should be minimun 8 charecters")
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$*&])[A-Za-z\d!@#$*&]{8,16}$/,"* Password Must Contains atleast one uppercase,lowercase, symboll and digit")
        .max(15,"* Password can be maximun 16 characters").required("* Password is reqiered")
        
    })

    const handleSubmit= async (values)=>{
        
        try{
            const response = await axios.post("http://localhost:5166/api/Auth/login",{email:values.email,password:values.password});
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('email',values.email);
            const mail = values.email;
            setAuth({
                token:response.data.token,
                isLoggedIn:true,
                
            })
            if(mail.includes('@admin.com')){
                localStorage.setItem('admin',true);
                Navigate('/adminhome');
                
            }else{

                Navigate('/userhome');
            }
        }catch(error){
            setInvalidCred(true);
        }
    }

    return(
        <div  className="login">
            <img src={process.env.PUBLIC_URL+"images/doctor.png"} alt="doctorImage" width="30%" style={{float:'left'}}/>      
            <div className="container bg-info bg-opacity-25 " style={{width:"50%",marginTop:"8%",position:'absolute',left:"40%"}}>
                <h2 className="text-center pt-3">LOG IN</h2>
                {invalidCred && <h5 className="text-danger text-center"> Wrong email or password</h5>}
                <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className="col-md-12 pt-5">  
                        <div className="form-group mb-3">
                            <div className="row">

                            <label className="form-label col-5 text-end" htmlFor="email">Email :</label>
                            <Field type='text' name= "email" id="email" className="form-control col" style={{marginRight:"15%"}} placeholder="Enter registered Mail" />
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
                        <div className="row container-fluid mb-5">
                            <div className="text-center">
                                    <button className="btn btn-primary" type="submit">LogIn</button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
export default Login;