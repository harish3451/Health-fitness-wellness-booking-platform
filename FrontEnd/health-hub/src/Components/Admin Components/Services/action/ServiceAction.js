import axios from "axios";

export const ADD_SERVICE = "ADD_SERVICE";
export const UPDATE_SERVICE = "UPDATE_SERVICE";
export const DELETE_SERVICE = "DELETE_SERVICE";
export const FETCH_SERVICE = "FETCH_SERVICE";

//Add Service
export const addService=(newService)=>async dispatch => {
   
        const response = await axios.post("http://localhost:5280/api/Catalogue",newService).catch((error)=>{alert( newService.CompanyEmail+ "  is already registered");return;});
        if(response){
            dispatch({type:ADD_SERVICE,payload:response.data});
        }
}

//Update Service
export const updateService=(id,update_Service)=> async dispatch=>{
    const response = await axios.post(`http://localhost:5280/api/Catalogue/${id}`,update_Service);
    //console.log(response);
    dispatch({type:UPDATE_SERVICE,payload:update_Service,id:id});
}

//Delete Service
export const deleteService = (id)=>async dispatch =>{
    const response = await axios.delete(`http://localhost:5280/api/Catalogue/${id}`);

    dispatch({type:DELETE_SERVICE,payload:id});
}

//Fetch service
export const fetchService = ()=>async dispatch=>{
    const response = await axios.get("http://localhost:5280/api/Catalogue");
    dispatch({type:FETCH_SERVICE,payload:response.data});
}