import React from 'react'
import AdminHomeComponent from '../components/Admin/AdminHomeComponent'
import { useUser } from '../context/UserContext'
import Error from '../pages/Error'

const Admin = () => {
    const {isAdmin} = useUser()
    return (
        <div>
            {isAdmin ? <AdminHomeComponent/> : <Error title='El usuario no es administrador'/>}
        </div>
    )
}

export default Admin