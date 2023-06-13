import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {Toaster} from "react-hot-toast";
import { useContext, useEffect} from "react";
import { context, server } from "./main";
import axios from "axios";

function App() {
  const {setisAuthenticated,setUser,setLoading,}=useContext(context);

 
  useEffect(()=>{
    setLoading(true)
axios.get(`${server}/users/me`,{
  withCredentials:true,
  }).then((res)=>{
    setUser(res.data.user);
    // console.log(res.data.user)
    setisAuthenticated(true);
    setLoading(false)
  }).catch((error)=>{
    setisAuthenticated(false);
    setLoading(false);
    setUser({});  
  })
},[]);

  return (
    <>
 <Router>
  <Header/>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/profile" element={<Profile />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />}/>

  </Routes>
  <Toaster/>
 </Router>
    </>
  )
}

export default App
