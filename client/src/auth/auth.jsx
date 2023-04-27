import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { adminLogout } from "../features/authSlices/adminSlice";


  function AdminCheckLogin() {
    const dispatch = useDispatch();
    axios.get("/api/admin/admin-verify").then((res) =>{
      console.log(res)
    }).catch(() => {
      dispatch(adminLogout())
    })
    const admin = useSelector((state) => state.admin);
    console.log(admin);
    return (
      admin.isLoggedIn?<Outlet/>:<Navigate to='/admin/login'/>
    )
  }

function  AdminIsLogged(){
    const admin=useSelector((state)=>state.admin)
    console.log(admin);
    return(
      admin.isLoggedIn?<Navigate to='/admin/dashboard' />:<Outlet/>
    )
  }

function VendorCheckLogin() {
    const vendor = useSelector((state) => state.vendor);
    return (
      vendor.isLoggedIn?<Outlet/>:<Navigate to='/vendors/login'/>
    )
  }

function  VendorIsLogged(){
    const vendor=useSelector((state)=>state.vendor)
    return(
      vendor.isLoggedIn?<Navigate to='/vendors/home' />:<Outlet/>
    )
  }

  
export { AdminCheckLogin, AdminIsLogged, VendorCheckLogin, VendorIsLogged}
