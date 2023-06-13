import React from 'react'

const Todoitem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,

}) => {
  return (
   <div className='todo_container'>
      <div className='todos'>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className="btn">
        <input className='check' onChange={()=>{updateHandler(id)}} type="checkbox"  checked={isCompleted}/>
        <button onClick={()=>{deleteHandler(id)}}>delete</button> 
      </div>
      
    </div>

  )
}

export default Todoitem