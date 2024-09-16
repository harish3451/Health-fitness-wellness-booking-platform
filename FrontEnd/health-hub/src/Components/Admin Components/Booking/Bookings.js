import axios from "axios";
import React, { useEffect, useState } from "react";
import BookingDetails from "./BookingDetails";

const Bookings=()=>{

    const [bookings,setBookings] = useState([]);


    const fetch = async ()=>{
        const response = await axios.get(`http://localhost:5254/api/Bookings`,{
            headers:{
                "Content-Type":'application/json'
            }
        }).then(res=> setBookings(res.data.reverse()));
        
    };
    useEffect(()=>{
        fetch();
    },[])

    useEffect(()=>{
        const pendingBookings = bookings.filter(b=>b.status === 0);
        const remainingBookings = bookings.filter(b=>b.status !== 0);
        console.log(pendingBookings,remainingBookings);

    },[bookings])
    console.log(bookings);

    return(
        <div className="container">
            <div className="p-3">
                <h2 className="text-center">Booking Requests</h2>
            </div>
            <div className="container">
            {bookings?
            <>
                {bookings.map(b=>{
                    return <BookingDetails booking={b} key={b.id}/>
                })}                 
            </>:<>Not Booked Any appointment till now</>    
        }  
            </div>
        </div>
    )
}

export default Bookings;