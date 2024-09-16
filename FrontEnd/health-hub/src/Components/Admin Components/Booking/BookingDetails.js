import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookingDetails = ({booking})=>{

    const status = ['Requested','Cancelled','Confirmed'];
    const Navigate = useNavigate();
    useEffect(()=>{
        console.log("Booking details ",booking);
    },[])

    const Cancelmail={
        ToEmail:'harish.12656.kumar@gmail.com',
        toName:booking.userEmail,
        subject:"Request Cancelled",
        body:`<p>Dear User,</p>
        <p>Thank you for showing your interest by booking appointment . <br/>Your request has been cancelled by company due to busy schedule for the day. Please try to book for next day. <br/>Regard,<br/>Health-Hub</p>      
        `
    }

    const handleDelete= async ()=>{
        await axios.patch(`http://localhost:5254/api/Bookings/${booking.id}`,1,{
            headers:{
                "Content-Type":'application/json'
            }
        }).then(
          res=>  axios.post("http://localhost:5042/api/MailContoller",Cancelmail)
        )
        booking.status = 1;
        Navigate('/adminhome')
    }

    const Acceptmail={
        ToEmail:'harish.12656.kumar@gmail.com',
        toName:booking.userEmail,
        subject:"Appointment booked successfully",
        body:`<p>Dear User,</p>
        <p>Thank you for showing your interest by booking appointment . <br/>Your Appointment request has been acception. <br/>Regard,<br/>Health-Hub</p>      
        `
    }

    const handleAccept = async()=>{
        await axios.patch(`http://localhost:5254/api/Bookings/${booking.id}`,2,{
            headers:{
                "Content-Type":'application/json'
            }
        }).then(
          res=>  axios.post("http://localhost:5042/api/MailContoller",Acceptmail)
        )
        booking.status = 2;
        
    }

    return(
        <div className="container">
            <div className="row border border-dark pb-2 mt-2 rounded">
                <div className="col-sm-8 col-12 p-2">
                    <p>Request by <b>{booking.userEmail}</b> to book appointment at <b>{booking.companyName}</b>. <br/>Appointment date and time slote are  <b>{booking.appointmentDate}</b> and <b>{booking.timeSlab}</b></p>
                </div>
                <div className="col-sm-4 col-12 p-3 text-end">
                    {booking.status === 1?<>
                        <b className="text-danger">{status[booking.status]}</b>
                    </>:<>
                        {booking.status === 2?<>
                            <b className="text-success">{status[booking.status]}</b>
                        </>:<>
                        <button className="btn btn-success" onClick={handleAccept} >Accept</button>
                        <button className="btn btn-danger ms-3" onClick={handleDelete}>Cancel</button>
                        </>}
                    </>}
                </div>
            </div>
        </div>
    )
}

export default BookingDetails;