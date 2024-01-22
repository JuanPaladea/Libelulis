import React from 'react'
import SobreNosotrosHeaderComponent from '../components/SobreNosotrosHeader/SobreNosotrosHeaderComponent'
import SobreNosotrosBlogComponent from '../components/SobreNosotrosBlog/SobreNosotrosBlogComponent'
import { motion } from 'framer-motion'
import TestimoniesComponent from '../components/Testimonies/TestimoniesComponent'

const SobreNosotros = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
        <SobreNosotrosHeaderComponent/>
        <TestimoniesComponent/>
        <SobreNosotrosBlogComponent/>
    </motion.div>
  )
}

export default SobreNosotros