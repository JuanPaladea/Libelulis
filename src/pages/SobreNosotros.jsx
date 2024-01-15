import React from 'react'
import SobreNosotrosHeaderComponent from '../components/SobreNosotrosHeader/SobreNosotrosHeaderComponent'
import SobreNosotrosBlogComponent from '../components/SobreNosotrosBlog/SobreNosotrosBlogComponent'
import { motion } from 'framer-motion'

const SobreNosotros = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
        <SobreNosotrosHeaderComponent/>
        <SobreNosotrosBlogComponent/>
    </motion.div>
  )
}

export default SobreNosotros