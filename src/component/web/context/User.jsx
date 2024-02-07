import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect } from "react";
import { useState } from "react";


export const UserContext=createContext(null);
export function UserContextProvider({children}){

    let [userToken,setUserToken] =useState(null);

    let [userData,setUserData]=useState(null);

    let [loading,setLoading] = useState(true);
    const getUserData=async ()=>{
        if(userToken)
        {
            const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
            {headers:{Authorization:`Tariq__${userToken}`}});
            console.log(data);
            setUserData(data.user);
            setLoading(false);
        }
    }

    useEffect(()=>{
        getUserData();
    },[userToken]);

    return <UserContext.Provider value={{userData,setUserData,getUserData,userToken,setUserToken,loading}}>
        {children}
    </UserContext.Provider>
}