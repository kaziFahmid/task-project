import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className='grid md:grid-cols-12'>
        <div className='col-span-2'>
<div className='bg-slate-400 h-screen hidden md:block pt-14'>
    <h1 className='text-center text-4xl'> Admin</h1>
    <ul className='text-center mt-14'>
      <Link to='/dashboard/allusertask'><li className='text-2xl'>All users Task</li></Link>
      <Link to='/dashboard/reports'><li className='text-2xl mt-10'>Reports</li></Link>
    </ul>
</div>
        </div>

        <div className='col-span-10'>
        <div className="navbar bg-base-300">


        <div className="drawer z-50 md:hidden block">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open </label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" className="drawer-overlay"></label>
    <ul className="menu p-4 w-56 h-full bg-base-200 text-start text-base-content">
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Close</label>
      <Link to='/dashboard/allusertask'><li className='text-2xl mt-36'>All users Task</li></Link>
      <Link to='/dashboard/reports'><li className='text-2xl mt-10'>Reports</li></Link>
      
    </ul>
  </div>
</div>





  <a className="btn btn-ghost normal-case text-xl">Dashboard</a>
</div>
            <Outlet/>
        </div>

    </div>
  )
}
