import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useUsers from '../hooks/useUsers';

export default function CreateTask() {

    const [refetch,users]=useUsers()
    
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const title = e.target.title.value;
      const description = e.target.description.value;
      const dueDate = e.target.dueDate.value;
      const status = e.target.status.value;
      const assignedUser = e.target.assignedUser.value;
  
      axios
        .post('/tasks', {
          title,
          description,
          dueDate,
          status,
          assignedUser,
        })
        .then((res) => {
          if(res.insertedId){
            alert("Task added")
          };
    
        })
        .catch((error) => {
          console.error('Error creating task:', error);
     
        });
    };
  
  return (
    <div className="max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-4">Create Task</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-1">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name='title'
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-1">
          Description:
        </label>
        <textarea
          id="description"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
          name='description'
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-gray-700 font-bold mb-1">
          Due Date:
        </label>
        <input
          type="date"
          id="dueDate"
          name='dueDate'
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 font-bold mb-1">
          Status:
        </label>
        <select
          id="status"
          name='status'
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="" disabled>Select status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="assignedUser" className="block text-gray-700 font-bold mb-1">
          Assigned User:
        </label>
        <select
          id="assignedUser"
          name='assignedUser'
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          {users.map((user)=> <option value={user?.username}>{user?.username}</option>)}

    

        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
      >
        Create
      </button>
    </form>
  </div>
  )
}
