import React from 'react'
import { useUser } from '../context/UserContext'
import Error from '../pages/Error'
import AdminContactComponent from '../components/Admin/AdminContactComponent'
import LoaderComponent from '../components/Loader/LoaderComponent'
import { motion } from 'framer-motion'

const AdminContactos = () => {
    const {isAdmin, loading} = useUser()

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
            {loading 
            ? 
            (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 z-50"><LoaderComponent/></div>
            )
            :
                isAdmin 
                ? 
                <AdminContactComponent/> 
                : 
                <Error title='El usuario no es administrador'/>
                }
        </motion.div>
    )
}

export default AdminContactos