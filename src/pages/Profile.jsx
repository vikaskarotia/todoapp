import React, { useContext, useEffect } from 'react'
import { context, server } from '../main'
import Loader from '../components/Loader';


const Profile = () => {
  const {user,loading}=useContext(context);
   
  // useEffect(() => {
  //   window.location.reload()
  // }, [])
  console.log("user",user)
  return (
    
     
      
    <div>
    <h1>{user?.name}</h1>
    <p>{user?.email}</p>
  </div>
    
      )
  
  
}

export default Profile