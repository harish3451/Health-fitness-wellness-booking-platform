import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import Appointment from "./Appointments";
import axios from "axios";

const BookAppointment = () => {
    const location = useLocation();
    const Navigate = useNavigate();
    const { state } = location;
    const timeSlab = ['9:00am-11:00am','11:00am-1:00pm','2:00pm-4:00pm','4:00pm-6:00pm'];
    const [date,setDate]=useState('');
    const initialValue={
        service:state.cat[0],
        timeSlab:'9:00am-11:00am'
    }

    const [MinDate,SetMinDate] = useState(''); 
    
    useEffect(()=>{
        minDate();
        console.log(MinDate);
    },[MinDate])

    const handleSubmit= async (values)=>{
        const bookings  = {
            userEmail:state.userEmail,
            companyName:state.companyName,
            serviceSelected:values.service,
            AppointmentDate:date,
            timeSlab:values.timeSlab,
            status:0
        }

        

        const mail={
            ToEmail:'harish.12656.kumar@gmail.com',
            toName:state.userEmail,
            subject:"Appointment booking request Recieved",
            body:`<p>Dear User,</p>
            <p>Thank you for sending booking appointment request. <br/>Once request confirmed you will recieve notification. <br/><br/>Regard,<br>Health-Hub</p>      
            `
        }

        const response = await axios.post("http://localhost:5254/api/Bookings",bookings).then(res=>{
             axios.post("http://localhost:5042/api/MailContoller",mail);
        });
        Navigate('/manager/appointment');
        }

        const minDate = ()=>{
            const d = new Date();
            const year = d.getFullYear();
            let month = d.getMonth() +1 ;
            let date  = d.getDate() +1;
            month = month<10? '0'+month:month;
            date  = date<10? '0'+date:date;
            SetMinDate( `${year}-${month}-${date}`);
        }

    return (
        <div className="container">
            <div className="text-end w-100">
                <button className="btn btn-secondary m-3" onClick={() => Navigate('/userhome')} >Back to services</button>
            </div>
            <div>
                <h3 className="text-center mb-5">Book Appointment </h3>
                <h5>Company Name : {state.companyName}</h5>
                <Formik initialValues={initialValue} onSubmit={handleSubmit}  >
                    <Form>
                        <div className="row pt-2">
                            <div className="form-group col-6">
                                <label className="form-label" htmlFor="service">Select Service</label>
                                <Field as="select" id="service" name="service" className="form-control">
                                    {state.cat.map(s=>(
                                        <option value={s} >{s}</option>
                                    ))}
                                </Field>
                            </div>
                            <div className="form-group col-6">
                                <label className="form-label" htmlFor="date">Select date</label>
                                <input type="date"  min={MinDate} onChange={(e) => {setDate(e.target.value)}} id="date" name="date" className="form-control" required />
                                    <ErrorMessage id="date" name="date" component='div' className="text-danger"/>
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="form-group col-6">
                                <label className="form-label" htmlFor="timeSlab">Select Time slab</label>
                                <Field as="select" id="timeSlab" name="timeSlab" className="form-control">
                                    {timeSlab.map(t=>{
                                        return <option values={t}>{t}</option>
                                    })}
                                </Field>
                            </div>
                        </div>
                        <button Type="submit" className="btn btn-success mt-2 mb-5">Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
export default BookAppointment;