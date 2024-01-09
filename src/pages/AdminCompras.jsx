import React from 'react'
import AdminComprasComponent from '../components/Admin/AdminComprasComponent'
import { useUser } from '../context/UserContext'

const AdminCompras = () => {
  const {isAdmin} = useUser()
  
  return (
    <div>
        {isAdmin 
        ? 
        <AdminComprasComponent/> 
        : 
        <Error title='El usuario no es administrador'/>
        }
    </div>
  )
}

export default AdminCompras