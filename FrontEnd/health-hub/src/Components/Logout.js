import React from "react";
import { useNavigate} from "react-router-dom";

function Logout(){
    const Navigate = useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('admin');
        Navigate('/');
        window.location.reload();
    };

    return <button onClick={handleLogout} className="btn btn-danger m-2">Logout</button>
}

export default Logout;