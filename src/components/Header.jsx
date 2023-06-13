import React, { useContext, useEffect } from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import { context, server } from '../main';
import { toast } from 'react-hot-toast';
import axios from 'axios';
const Header = () => {

  const {isAuthenticated,setisAuthenticated,loading,setLoading,user,setUser}=useContext(context);
  const history = useNavigate();

  const logoutHander = async() => {
    setLoading(true)
    
    try {
     const {data}= await axios.get(`${server}/users/logout`,
     {
         withCredentials:true,
       })
   toast.success(data.message);
   setisAuthenticated(false);
      setLoading(false)
     
     history('/login')
    } catch (error) {
     toast.error(error.response.data.message)
 
   console.log(error)
   setisAuthenticated(true);
   setLoading(false)
    }
  
    }
 
  return (
    
    <nav className='header'>
        <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/6/67/Microsoft_To-Do_icon.png" alt="" />
        <h1 style={{color:"white"}}>TODO APP</h1>
        
        <article className='nav_link'>
          <Link className='link' to={"/"}>Home</Link>
          <Link className='link' to={"/profile"}>Profile</Link>

          {
            isAuthenticated? <button disabled={loading} onClick={logoutHander} className=''  >logout</button>:
            <Link className='link' to={"/login"}>login</Link>
          }
         </article>

    </nav>
  )
}

export default Header