import React from 'react'
import { useUser } from '../context/UserContext'
import Error from '../pages/Error'
import AdminContactComponent from '../components/Admin/AdminContactComponent'

const AdminContactos = () => {
    const {isAdmin} = useUser()
    return (
        <div>
            {isAdmin ? <AdminContactComponent/> : <Error title='El usuario no es administrador'/>}
        </div>
    )
}

export default AdminContactos