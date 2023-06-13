import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./styles/app.css";
import { createContext } from 'react';
 
export const server="https://nodejsapp-backend.onrender.com/api/v1";

  export const context=createContext();

 const Appwrapper=()=>{
const [isAuthenticated,setisAuthenticated]=useState(false);
const [loading,setLoading]=useState(false);
const [user,setUser]=useState();


  return (
  <context.Provider value={{
    isAuthenticated,setisAuthenticated,
    loading,setLoading,
    user,setUser,
  
  }}>
    <App />
  </context.Provider>

)
   }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Appwrapper/>
  </React.StrictMode>,
)
