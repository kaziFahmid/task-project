import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

export default function Allusertask() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');

  const { refetch, data: tasks = [] } = useQuery({
    queryKey: ['tasks', search, sort, filter],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/tasks?search=${search}&sort=${sort}&filter=${filter}`);
      return res.json();
    },
  });

  return (
    <>
      <div  className='text-center'>
        <div className='flex justify-center items-center mt-4 gap-4'>
          <input
            type='text'
            placeholder='Search Task'
            className='input input-bordered w-full max-w-xs'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
       
        </div>

        <details className='dropdown mt-2'>
          <summary className='m-1 btn'>Filter</summary>
          <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52'>
            <li onClick={() => {setFilter('Pending')}}>
              <a>Pending</a>
            </li>
            <li onClick={() => setFilter('Completed')}>
              <a>Completed</a>
            </li>
            <li onClick={() => setFilter('In Progress')}>
              <a>In Progress</a>
            </li>
          </ul>
        </details>

        <details className='dropdown'>
          <summary className='m-1 btn'>Sort</summary>
          <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52'>
            <li onClick={() => setSort('asc')}>
              <a>Asc</a>
            </li>
            <li onClick={() => setSort('desc')}>
              <a>Desc</a>
            </li>
          </ul>
        </details>
      </div>

      <div className='grid grid-cols-1 gap-12 container mx-auto mt-10 md:grid-cols-3'>
        {tasks.map((task) => {
          return (
            <div className='card bg-base-100 shadow-xl' key={task.id}>
              <div className='card-body'>
                <h2 className='card-title flex justify-between'>
                  {task.title} <span>{task.status}</span>
                </h2>
                <p>{task.description}</p>
                <p>
                  <span className='font-bold'>Assigned User</span>: {task.assignedUser}
                </p>
                <p>
                  <span className='font-bold'>Due-dates</span>
                  <span>{task.dueDate}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
