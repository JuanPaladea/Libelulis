import React from 'react'
import OrderSummary from '../components/OrderSummary/OrderSummary'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'

const Summary = () => {
  const {summary} = useCart()
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
        <OrderSummary/>
    </motion.div>  
    )
}

export default Summary