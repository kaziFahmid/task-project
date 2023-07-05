import React  from 'react'

import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { AuthContext } from '../AuthProvider/AuthProvider';


export default function PrivateRoute({children}) {
const{user,loading}=useAuth(AuthContext)
let location = useLocation();
if(loading){
    return <h1>.....Loading</h1>
}
if(user){
    return children
}
  return <Navigate to='/userregistration' state={{ from: location }} replace></Navigate>
}
