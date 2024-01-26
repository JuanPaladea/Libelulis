import React from 'react'
import FAQComponent from '../components/FAQ/FAQComponent'
import { motion } from 'framer-motion'

const FAQ = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
        <FAQComponent/>
    </motion.div>
  )
}

export default FAQ