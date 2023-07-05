import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Main/Main';
import Tasks from './Tasks/Tasks';
import Login from './Registrations/Login';
import Signup from './Registrations/Signup';
import AuthProvider from './AuthProvider/AuthProvider';
import axios from 'axios';
import CreateTask from './CreateTask/CreateTask';
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import UpdateTask from './UpdateTask/UpdateTask';
import Dashboard from './Dashboard/Dashboard';
import Allusertask from './Allusertask/Allusertask';
import Reports from './Reports/Reports';

axios.defaults.baseURL=`http://localhost:5000/`
axios.interceptors.request.use((req)=>{return req})
axios.interceptors.response.use((res)=>{return res.data})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
      {
        path:"/",
        element:<Tasks/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:"/createtask",
        element:<CreateTask/>
      },
      {
        path:"/update/:id",
        element:<UpdateTask/>,
        loader: ({params})=> fetch(`http://localhost:5000/tasks/${params.id}`)
      },

    ]
  },
  {
    path:"/dashboard",
    element:<Dashboard/>,
children:[
  {
    path:'/dashboard/allusertask',
    element:<Allusertask/>

},
{
  path:'/dashboard/reports',
  element:<Reports/>

}
]
  },

]);
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<QueryClientProvider client={queryClient}>
<AuthProvider><RouterProvider router={router} /></AuthProvider>
</QueryClientProvider>
  </React.StrictMode>,
)
