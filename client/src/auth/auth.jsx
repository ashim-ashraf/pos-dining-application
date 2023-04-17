import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


function CheckLogin() {
    const user = useSelector((state) => state.user);
    console.log(user);
    return (
      user.isLoggedIn?<Outlet/>:<Navigate to='/login'/>
    )
  }

function  IsLogged(){
    const user=useSelector((state)=>state.user)
    console.log(user);
    return(
      user.isLoggedIn?<Navigate to='/home' />:<Outlet/>
    )
  }

  function AdminCheckLogin() {
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

  
export {CheckLogin , IsLogged , AdminCheckLogin, AdminIsLogged, VendorCheckLogin, VendorIsLogged}
