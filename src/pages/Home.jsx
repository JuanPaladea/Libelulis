import React from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import NewsletterComponent from '../components/Newsletter/NewsletterComponent'
import TestimoniesComponent from '../components/Testimonies/TestimoniesComponent'
import { motion } from 'framer-motion'
import GaleriaComponent from '../components/Galeria/GaleriaComponent'
import ColeccionesComponent from '../components/Colecciones/ColeccionesComponent'

const Home = () => {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
            <HeaderComponent/>
            <GaleriaComponent/>
            <ColeccionesComponent/>
            <NewsletterComponent/>
        </motion.div>
    )
}

export default Home