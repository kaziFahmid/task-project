import React, { createContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import app from '../firebase.config';




const auth = getAuth(app)

export const AuthContext=createContext(null)

export default function AuthProvider({children}) {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const provider = new GoogleAuthProvider();
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut=()=>{

        return signOut(auth)
    }
    const handleGoogleSignin=()=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            setLoading(false)
            setUser(currentUser)
  
        })

        return ()=>{
            unsubscribe()
        }
        
    },[])
    const userInfo={
        user,
        createUser,
        signInUser,
        logOut,
        loading,
        handleGoogleSignin,
    
    }
  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  )
}
