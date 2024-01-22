import { motion } from 'framer-motion'
import React from 'react'
import ResetPasswordComponent from '../components/ResetPassword/ResetPasswordComponent'

const ResetPassword = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
        <ResetPasswordComponent/>
    </motion.div>
  )
}


export default ResetPassword