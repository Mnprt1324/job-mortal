import { Outlet } from "react-router-dom"
import { Footer } from "../ui/Footer"
import { Navbar } from "../ui/Navbar"

export const AppLayout=()=>{
return<>
   <Navbar/>
   <Outlet/>
   <Footer/>
   </>
}