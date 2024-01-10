import React from 'react'
import RegisterComponent from '../components/Register/RegisterComponent'
import LoaderComponent from '../components/Loader/LoaderComponent'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
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
          <RegisterComponent/>
          }
    </div>
  )
}

export default Register