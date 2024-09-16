import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider=({children})=>{
    const [auth,setAuth] = useState({
        userId:null,
        Name : null,
        Email : null,
        PhoneNumber : null,
        token:null,
        isLoggedIn:false,
        login:true,
        register:true,
        book:false
    })

    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;