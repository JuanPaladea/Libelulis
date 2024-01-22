import { motion } from 'framer-motion'
import React from 'react'
import ForgotPasswordComponent from '../components/ForgotPassword/ForgotPasswordComponent'

const ForgotPassword = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
        <ForgotPasswordComponent/>
    </motion.div>  
    )
}

export default ForgotPassword