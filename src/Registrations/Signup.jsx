import React from 'react'
import { Link  ,useLocation, useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form";

import { updateProfile } from 'firebase/auth';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

export default function Signup() {
    const{createUser}=useAuth()
    let navigate = useNavigate()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
      } = useForm();
      const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        createUser(email, password)
          .then((result) => {
            const user = result.user;
            updateProfile(user, {
              displayName: data.username,
              photoURL: data.image,
            })
              .then(() => {
             axios.post('/allusers',{username:user?.displayName,email:user?.email})
                .then(res=>console.log(res))
              })
              .catch((error) => {
                // handle updateProfile error
              });
    
              navigate(from, { replace: true })
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // handle createUser error
          });
      };
    
      const password = watch('password');
      const confirmPassword = watch('confirmpassword');
      const isPasswordMatch = password === confirmPassword;
    
  return (
  <>
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">

        <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              User name
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
               
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                {...register('username', { required: 'Username is required' })}
                aria-invalid={errors.username ? 'true' : 'false'}
              />

{errors.username && (
                <p role="alert" className="text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>


          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
              
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('email', { required: 'Email is required' })}
                aria-invalid={errors.email ? 'true' : 'false'}
              />

{errors.email && (
                <p role="alert" className="text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
             
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
               
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password should be at least 6 characters',
                    },
                  })}
                  aria-invalid={errors.password ? 'true' : 'false'}
              />


            </div>



            {errors.password && (
                <p role="alert" className="text-red-500">
                  {errors.password.message}
                </p>
              )}
          </div>


          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              
            </div>
            <div className="mt-2">
              <input
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                autoComplete="current-password"
               
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                {...register('confirmpassword', {
                    required: 'Confirm Password is required',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                  aria-invalid={errors.confirmpassword ? 'true' : 'false'}
              />

{errors.confirmpassword && (
                <p role="alert" className="text-red-500">
                  {errors.confirmpassword.message}
                </p>
              )}
              {!errors.confirmpassword && !isPasswordMatch && (
                <p role="alert" className="text-red-500">
                  Passwords do not match
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>


        </form>

       <p className='mt-4'>Already have an account <Link to='/login'>Login</Link></p>
      </div>


    </div>
  
  
  
  
  
  </>
  )
}
