import React from 'react'
import LoginComponent from '../components/Login/LoginComponent'
import { useUser } from '../context/UserContext'
import LoaderComponent from '../components/Loader/LoaderComponent'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {user, loading} = useUser()
  const navigate = useNavigate()

  return (
    <div>
      {loading 
      ? 
      (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-80 z-50"><LoaderComponent/></div>
      )
      :
          user 
          ? 
          navigate('/') 
          : 
          <LoginComponent/>
          }
    </div>
  )
}

export default Login