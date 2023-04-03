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
  
  export {CheckLogin , IsLogged}