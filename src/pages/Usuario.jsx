import React from 'react'
import UsuarioComponent from '../components/Usuario/UsuarioComponent'
import { useUser } from '../context/UserContext'
import Error from '../pages/Error'
import { motion } from 'framer-motion'


const Usuario = () => {
  const {user} = useUser()
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
      {user ? (
        <UsuarioComponent/>
      )
      :
      (
        <Error  title="Usuario no encontrado" errorTipe='No se encuentra la sesión iniciada'/>
      )}
    </motion.div>
  )
}

export default Usuario