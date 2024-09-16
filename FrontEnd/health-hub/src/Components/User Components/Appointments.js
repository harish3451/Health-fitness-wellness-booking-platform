import axios from "axios";
import React, { useEffect, useState } from "react";
import BookingDetails from "./BookingDetails";

const Appointment =()=>{

    const userEmail = localStorage.getItem('email');
    const [bookings,setBookings] = useState([]);


    const fetch = async ()=>{
        const response = await axios.post(`http://localhost:5254/api/Bookings/mail`,userEmail,{
            headers:{
                "Content-Type":'application/json'
            }
        }).then(res=> setBookings(res.data.reverse()));
        
    };
    useEffect(()=>{
        fetch();
    },[])

    useEffect(()=>{
        console.log("Bookings ",bookings);
    },[bookings])
    console.log(bookings);
    
    return(
        <div className="container">
            <h2 className="text-center">Appointments</h2>
            {bookings?
            <>
                {bookings.map(b=>{
                    return <BookingDetails booking={b} key={b.id}/>
                })}                 
            </>:<>Not Booked Any appointment till now</>    
        }
        </div>
    )
}
export default Appointment;