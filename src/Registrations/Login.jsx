import React from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useForm } from 'react-hook-form'


export default function Login() {
    const {signInUser}=useAuth()
    let navigate = useNavigate()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const {
        register,
        formState: { errors },
        handleSubmit,
 
      } = useForm();


    const onSubmit =(data)=>{
        signInUser(data.email,data.password)
        .then((result) => {
       
            const user = result.user;
     
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });

          navigate(from, { replace: true })
      }







  return (
    <>
   
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form  onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
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
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
      
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                {...register('password', { required: 'Password is required' })}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
                {errors.password && (
                <p role="alert" className="text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className='mt-4'> have no account <Link to='/signup'>Register</Link></p>
      </div>

   
    </div>
  </>
  )
}
