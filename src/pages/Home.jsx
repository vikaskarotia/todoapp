import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { context, server } from '../main';
import { toast } from 'react-hot-toast';
import Todoitem from '../components/Todoitem';
import { Navigate } from 'react-router-dom';

function Home() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(context);


  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(`${server}/task/${id}`, {}, {
        withCredentials: true,
      })
      toast.success(data.message)
      setRefresh((refresh) => !refresh)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      })
      toast.success(data.message)
      setRefresh((refresh) => !refresh)

    } catch (error) {
      toast.error(error.response.data.message)
    }

  }

  const submitHander = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post(`${server}/task/new`, {
        title, description
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      toast.success(data.success)
      setRefresh((refresh) => !refresh)
             
    } catch (error) {
      toast.error(error.response.data.message)

      console.log(error)
    }
  }


  // if(!isAuthenticated){
  //   return <Navigate to={"/login"} />
  //  }
  useEffect(() => {

    setTitle("")
    setDescription("")
    const { data } = axios.get(`${server}/task/my`, {
      withCredentials: true,
    }).then((res) => {
      return (

        setTasks(res.data.task))
        
    }).catch((error) => {
      return toast.error(error.response.data.message)
    })
    
  }, [refresh])

  return (
    <div className='task_field'>
      <div className='task'>
        <form className="login_form" onSubmit={submitHander}  >
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='title' />
          <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='description' />
          <button /*</form>*disabled={loading}*/ type='submit'>Create task</button>
        </form>
      </div>
     <div >
        {
          tasks.map((i) => (
            <Todoitem  title={i.title} description={i.description} isCompleted={i.isCompleted}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
              id={i._id}
              key={i._id}
            />
          ))
        }
     </div>
    </div>
  )
}

export default Home;