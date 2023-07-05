import React from 'react'
import { Link } from 'react-router-dom'
import useTasks from '../hooks/useTasks'
import axios from 'axios'

export default function Tasks() {
    const [refetch,tasks]=useTasks()

    let handleDelete=(_id)=>{
            axios.delete(`/tasks/${_id}`)
            .then(res=>{
                if(res.deletedCount>0){
                    refetch()
                }
            })
    }
  return (
    <div>
     <div className='text-end'>
<Link to='/createtask'>  <button className='btn bg-slate-50 mt-3 me-3'>+ Create Task</button></Link>
     </div>


<div className='grid grid-cols-1 gap-12 container mx-auto mt-10 md:grid-cols-3'>
{tasks.map((task)=>{return <div className="card  bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title flex justify-between">{task.title} <span>{task.status}</span></h2>
    <p>{task.description}</p>
    <p><span className='font-bold'>Assigned User</span>: {task.assignedUser}</p>
    <p><span  className='font-bold'>Due-dates</span><span>{task.dueDate}</span></p>
    <div className="card-actions justify-end">
<Link to={`/update/${task._id}`}><button className="btn btn-primary">Update</button></Link>
      <button className="btn btn-primary" onClick={()=>handleDelete(task._id)}>Delete</button>
    </div>
  </div>

</div>})}

</div>

     
    </div>
  )
}
