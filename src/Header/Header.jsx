import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'




export default function Header() {
    const{user,logOut}=useAuth()
 
 
     

   

  return (
<div className="navbar bg-neutral  text-neutral-content justify-around items-center">
  <a className="btn btn-ghost normal-case text-xl">daisyUI</a>

  <ul className=' hidden md:flex  justify-center gap-5 cursor-pointer'>
    <Link to='/'><li>Home</li></Link>
{user?.email? <li onClick={()=>logOut()}>Logout</li>:<Link to='/login'><li>Login</li></Link>}
{user?.email? '':<Link to='/signup'><li>Signup</li></Link>}

<Link to='/dashboard'><li>Dashboard</li></Link>

 
  </ul>

  <details className="dropdown  md:hidden block">
  <summary className=" btn">open </summary>
  <ul className="p-2 w-24  shadow menu dropdown-content z-[1] bg-base-100 rounded-box ">
  <Link to='/'><li  >Home</li></Link>
{user?.email? <li onClick={()=>logOut()} >Logout</li>:<Link to='/login'><li>Login</li></Link>}
{user?.email? '':<Link to='/signup'><li >Signup</li></Link>}

<Link to='/dashboard'><li >Dashboard</li></Link>

  </ul>
</details>
</div>
  )
}
