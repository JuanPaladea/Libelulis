import React from 'react'
import UsuarioComponent from '../components/Usuario/UsuarioComponent'
import { useUser } from '../context/UserContext'
import { Link } from 'react-router-dom'
import Error from '../pages/Error'


const Usuario = () => {
  const {user} = useUser()
  return (
    <div>
      {user ? (
        <UsuarioComponent/>
      )
      :
      (
        <Error  title="Usuario no encontrado" errorTipe='No se encuentra la sesión iniciada'/>
      )}
    </div>
  )
}

export default Usuario