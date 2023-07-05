import React, { useContext } from 'react'
import { AuthContext } from '../AuthProvider/AuthProvider'



export default function useAuth() {
    const{user}=useContext(AuthContext)
  return useContext(AuthContext)
}
