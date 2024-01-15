import React from 'react'
import CheckoutComponent from '../components/Checkout/CheckoutComponent'
import { motion } from 'framer-motion'

const Checkout = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
        <CheckoutComponent/>
    </motion.div>
  )
}

export default Checkout