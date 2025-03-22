import { useState } from "react"
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const Super=()=>{
  const {forgetAuth}=useSelector((store)=>store.auth);
    const [loading,setLoading]=useState(false);
    if(loading){
        return <h2>Loading...</h2>
    }
    if(forgetAuth){
        return <Outlet/>
    }else{
        return <Navigate to="login"/>
    
    }
return
}