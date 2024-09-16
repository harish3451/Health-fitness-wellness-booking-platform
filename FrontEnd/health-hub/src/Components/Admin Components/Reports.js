import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

const Reports = () => {
    const [companies, setCompanies] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [numberOfUser, setNumberOfUser] = useState(0);
    const data=[];

    useEffect(() => {
        const userResponse = axios.get("http://localhost:5166/api/Auth").then(res => setNumberOfUser(res.data));
        const response = axios.get("http://localhost:5280/api/Catalogue").then(res => setCompanies(res.data));
        const response2 = axios.get("http://localhost:5254/api/Bookings").then(res => setBookings(res.data));
        console.log("number of user = ", numberOfUser);
        console.log("Compaies : ", companies);
        console.log("Bookings : ", bookings);
    }, [numberOfUser])

    const totalBooking=(name)=>{
        const p = bookings.filter(b=>b.companyName === name);
        return p.length;
    }

    const   cancelBooking=(name)=>{
        const p = bookings.filter(b=>b.companyName === name && b.status ===1);
        return p.length;
    }

    
    

    const handlePrint= ()=>{
        const printContent = document.getElementById('printable').innerHTML;
        
        const printWindow = window.open();
        printWindow.document.open();
        printWindow.document.write(`<html>`);
        printWindow.document.write(`<head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></head><body>`);
        printWindow.document.write(printContent);
        printWindow.document.write(`</body></html>`)
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }

    return (
        <div className="container">
            <div className="text-center  m-3" id="printable">
                <h3>Analytics Reports</h3>
            
            <div className="container mt-5 w-75">
                <table className="table table-bordered border-primary" border={'1px'}>
                    <thead>
                        <tr>
                        <th scope="col" >Total Number of service providers</th>
                        <th scope="col" >Number of users</th>
                        <th scope="col" >Number of bookings till now</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{companies.length}</td>
                            <td>{numberOfUser-1}</td>
                            <td>{bookings.length}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <h4 className="text-start mt-5">Service Providers booking status</h4>
            <div className="container ">
                <table className="table table-striped table-bordered border-primary" border={'1px'}>
                    <thead >
                        <tr>
                            <th>Service Provider</th>
                            <th>Total numbers of Bookings</th>
                            <th className="bg-danger text-white">Cancelled Bookings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies && companies.map(comp=>(
                            <tr>
                                <td scope="row" >{comp.companyName}</td>
                                <td>{totalBooking(comp.companyName)}</td>
                                <td className="text-danger">{cancelBooking(comp.companyName)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn btn-info" onClick={()=>handlePrint()}>Print</button>
            </div>
            </div>
        </div>
    )
}

export default Reports;