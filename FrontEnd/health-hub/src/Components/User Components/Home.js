import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import '../style/Style.css';
import { Dropdown,DropdownButton } from "react-bootstrap";
import {  FaSearch } from "react-icons/fa";
import ServiceCatalogue from "./ServiceCatalogue";

const Home=()=>{
    const {setAuth} = useContext(AuthContext);
    const [showType,setShowType] = useState(false);
    const [showDate,setShowDate] = useState(false);
    const [showLocation,setShowLocation] = useState(false);
    const [catalogue,setCataLogue] = useState([]);
    const [filterData,setFilterData] = useState([]);
    const [search,setSearch] = useState('');
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        const fetch = async()=>{
            try {
            const response = await axios.get("http://localhost:5166/api/Auth/profile",{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            });
            setAuth({
                userId:response.data.id,
                
                Name : response.data.name,
                Email : response.data.email,
                PhoneNumber : response.data.phoneNumber,
                token:response.data.token,
                login:false,
                register:false
                })
             } catch (error) {
            console.error(error);
        }
        };
       
        fetch();
       
    },[setAuth])

    const fetchService = useCallback(async ()=>{
        try {
            const clinics = await axios.get("http://localhost:5280/api/Catalogue");
            setCataLogue(clinics.data);
            return await clinics.data;
        } catch (error) {
            console.error(error);
        }
    },[])

    useEffect( ()=>{
                
        setLoading(true);
        fetchService().then(resp=>setFilterData(resp))
        console.log("use");
        setLoading(false);
    },[])

    const handleSearch=()=>{
        setLoading(true);
        if(search.length>0){
            setFilterData(catalogue.filter(f=>(f.companyName.toLowerCase().includes(search.toLowerCase()) || f.services.toLowerCase().includes(search.toLowerCase()))))
        }
        else{
            setFilterData(catalogue);
        }
        setLoading(false);
    }

    const handleTypeClick=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        setShowType(!showType)
    }
    const handleDateClick=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        setShowDate(!showDate)
    }
    const handleLocationClick=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        setShowLocation(!showLocation)
    }

    const handleDropdowmMedicalClick= ()=>{
        setLoading(true);
        console.log("filtered before",filterData);
        setFilterData(catalogue.filter(f=>f.type === "Medical"));
        console.log("filtered after",filterData);
        setLoading(false);
    }
    const handleDropdowmFitnessClick=()=>{
        setLoading(true);
        setFilterData(catalogue.filter(f=>f.type === "Fitness"));
        console.log(filterData);
        setLoading(false);
    }
    const handleDropdowmWellnessClick=()=>{
        setLoading(true);
        setFilterData(catalogue.filter(f=>f.type === "Wellness"));
        console.log(filterData);
        setLoading(false);
    }
    const handleDropdowmcity1=()=>{
        setLoading(true);
        setFilterData(catalogue.filter(f=>f.locationCity === "Vijayawada"));
        console.log(filterData);
        setLoading(false);
    }
    const handleDropdowmcity2=()=>{
        setLoading(true);
        setFilterData(catalogue.filter(f=>f.locationCity === "Hyderabad"));
        console.log(filterData);
        setLoading(false);
    }
    const handleDropdowmcity3=()=>{
        setLoading(true);
        setFilterData(catalogue.filter(f=>f.locationCity === "Ahmedabad"));
        console.log(filterData);
        setLoading(false);
    }
    const handleDropdowmcity4=()=>{
        setLoading(true);
        setFilterData(catalogue.filter(f=>f.locationCity === "Jodhpur"));
        console.log(filterData);
        setLoading(false);
    }
    const handleDropdowmcity5=()=>{
        setLoading(true);
        setFilterData(catalogue.filter(f=>f.locationCity === "Mumbai"));
        console.log(filterData);
        setLoading(false);
    }
    const handleDropdowmNewClick=()=>{
        setLoading(true);
        setFilterData(catalogue.reverse());
        console.log(filterData);
        setLoading(false);
    }
    const handleDropdowmOldClick=()=>{
        setLoading(true);
        setFilterData(catalogue);
        console.log(filterData);
        setLoading(false);
    }

    const handleDropdowmNoneClick=()=>{
        setLoading(true);
        setFilterData(catalogue);
        setLoading(false);
    }

    if(loading) return <><div class="mt-5 justify-content-center">
    <div class="spinner-border" role="status">
        <span class="sr-only"></span>
    </div>
</div></>

    return(
        <div className=" home" id="home">
            <h1 className="ps-3 pt-3">  Book Appointment</h1>
            <div className="row justify-content-around pt-5">
                
                <div className=" col-md-4 col-6">
                    <div className="row justify-content-center">

                    <input type="text" className="form-control w-75 float-left col-10" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/><FaSearch size={38}  className="col ps-0" onClick={handleSearch} style={{cursor:"pointer"}}/>
                    </div>
                </div>
                <div className="col-md-2 col-0"></div>
                <div className="col-md-4 col-6 ">
                    <div className="row">

                    <b className="col-md-2 col-5">Filter: </b>
                    <div className="col">
                        <DropdownButton id="dropdown-basic" title="Filter By">
                            <Dropdown.Item as="button" onClick={handleTypeClick}>
                                Type {showType?'▲':'▼'}
                            </Dropdown.Item>
                            {showType && <>
                                <Dropdown.Item onClick={handleDropdowmMedicalClick}>Medical</Dropdown.Item>
                                <Dropdown.Item onClick={handleDropdowmFitnessClick}>Fitness</Dropdown.Item>
                                <Dropdown.Item onClick={handleDropdowmWellnessClick}>Wellness</Dropdown.Item>
                            </>}
                            <Dropdown.Item as="button" onClick={handleDateClick}>
                                Date {showDate?'▲':'▼'}
                            </Dropdown.Item>
                            {showDate && <>
                                <Dropdown.Item onClick={handleDropdowmNewClick}>Newly Add</Dropdown.Item>
                                <Dropdown.Item onClick={handleDropdowmOldClick}>Old</Dropdown.Item>
                            </>}
                            <Dropdown.Item as="button" onClick={handleLocationClick}>
                                Location {showLocation?'▲':'▼'}
                            </Dropdown.Item>
                            {showLocation && <>
                                <Dropdown.Item onClick={handleDropdowmcity1}>Vijayawada</Dropdown.Item>
                                <Dropdown.Item onClick={handleDropdowmcity2}>Hyderabad</Dropdown.Item>
                                <Dropdown.Item onClick={handleDropdowmcity3}>Ahmedabad</Dropdown.Item>
                                <Dropdown.Item onClick={handleDropdowmcity4}>Jodhpur</Dropdown.Item>
                                <Dropdown.Item onClick={handleDropdowmcity5}>Mumbai</Dropdown.Item>
                            </>}
                            <Dropdown.Item onClick={handleDropdowmNoneClick}>None</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    </div>
                </div>
            </div>
            {loading ? <>
                <div class="mt-5 justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only"></span>
                        </div>
                </div>
            </>:
            <div className="container pb-3">
                {filterData.length>0 ?
                <>
                    {filterData.map(f=>(
                        <ServiceCatalogue service={f} key={f.id}/>
                    ))}
                </>:
                <><h2>No Service Available</h2></>    
                }
            </div>}
        </div>
    )
}

export default Home;