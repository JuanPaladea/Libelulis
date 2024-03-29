import React, { useState } from 'react'
import AdminProductsComponent from '../components/Admin/AdminProductsComponent'
import { useCollection } from '../hooks/useCollection'
import AdminProductFormComponent from '../components/Admin/AdminProductFormComponent'
import { useUser } from '../context/UserContext'
import Error from '../pages/Error'
import LoaderComponent from '../components/Loader/LoaderComponent'
import { motion } from 'framer-motion'

const AdminProductos = () => {
  const {productos, loading} = useCollection('products')
  const {isAdmin, loading: userLoading} = useUser()

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
      
      {userLoading 
      ? 
      (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 z-50"><LoaderComponent/></div>
      )
      :
        isAdmin 
        ? 
        (
          <div>
            <AdminProductFormComponent/>
            {loading 
            ?
            <div className="p-6 w-full h-full flex items-center justify-center">
              <LoaderComponent/> 
            </div>
            :
            (
              <AdminProductsComponent products={productos}/>
            )}
          </div>
        ) 
        :
        (
          <Error title='El usuario no es administrador'/>
        )}
    </motion.div>
  )
}

export default AdminProductos