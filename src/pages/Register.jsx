import React, { useContext } from 'react'
import { useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { context, server } from '../main';
import {toast} from "react-hot-toast"




const Register = () => {
  
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const {isAuthenticated,setisAuthenticated,loading,setLoading}=useContext(context);


  const submitHander = async(e) => {
    setLoading(true)
   e.preventDefault()
   try {
  
   const {data}= await axios.post(`${server}/users/new`,
   {
        name, email, password
      },{
        headers:{
          "Content-Type":"application/json",
        },
        withCredentials:true,
      })       
  toast.success(data.message);
  setLoading(false)
  setisAuthenticated(true);

   } catch (error) {
    toast.error(error.response.data.message)

 
  setisAuthenticated(false);
  setLoading(false)
    
   } 
   }

   if(isAuthenticated){
    return <Navigate to={"/"} />
   }

  return (
    <div className='login'>
      <section>
        <form className="login_form" onSubmit={submitHander}>
          <input value={name} onChange={(e)=> setname(e.target.value)} className='inpt' type="text" placeholder='name' />
          <input value={email} onChange={(e) => setemail(e.target.value)} className='inpt' type="email" placeholder='email' />
          <input value={password} onChange={(e) => setpassword(e.target.value)} className='inpt' type="password" placeholder='password' />
          <button disabled={loading} className='inpt' type='submit'>sign up</button>
          <h4 className='btn'>or</h4>
          {/* <Link className='btn' to="/login"> login</Link> */}
          <Link to="/login"><button className='' >Login</button></Link> 
        </form>
      </section>
    </div>
  )
}

export default Register