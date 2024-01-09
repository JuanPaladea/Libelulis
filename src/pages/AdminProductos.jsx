import React, { useState } from 'react'
import AdminProductsComponent from '../components/Admin/AdminProductsComponent'
import { useCollection } from '../hooks/useCollection'
import AdminProductFormComponent from '../components/Admin/AdminProductFormComponent'
import { useUser } from '../context/UserContext'
import Error from '../pages/Error'

const AdminProductos = () => {
  const {productos} = useCollection('products')
  const {isAdmin} = useUser()

  return (
    <div>
      {isAdmin 
      ? 
      (
        <div>
          <AdminProductFormComponent/>
          <AdminProductsComponent products={productos}/>
        </div>
      ) 
      :
      (
        <Error title='El usuario no es administrador'/>
      )}
    </div>
  )
}

export default AdminProductos