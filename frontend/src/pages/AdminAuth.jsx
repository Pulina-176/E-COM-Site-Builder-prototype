import React from 'react'
import axios from 'axios'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'

const AdminAuth = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  let navigate = useNavigate();

  const [message, setMessage] = useState('') //State to store the message or error when click Signin

  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const res = await axios.post(`${backendUrl}/admin-auth`, formData, {
      withCredentials: true, // Include credentials (cookies)
    })
    .catch((err)=>setMessage(err.response.data.error)) //If error, set the error message

    if (res.status === 200) {
      setMessage(res.data.message)
      localStorage.setItem('isAuthenticated', true);
      navigate('/admin'); //If successful signin, go to admin home
    } 
  }  

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Admin ID
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="username"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  onChange={handleChange}
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>

            <div className='h-8 w-[auto] text-red-700'>
                {message}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            No authentication?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Contact the developers
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default AdminAuth