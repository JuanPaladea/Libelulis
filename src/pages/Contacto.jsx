import React from 'react'
import ContactoHeaderComponent from '../components/ContactoHeader/ContactoHeaderComponent'
import ContactFormComponent from '../components/ContactForm/ContactFormComponent'
import { motion } from 'framer-motion'

const Contacto = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
      <ContactoHeaderComponent/>
      <ContactFormComponent/>
    </motion.div>
  )
}

export default Contacto