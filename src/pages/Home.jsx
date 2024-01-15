import React from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import CategoriesComponent from '../components/Categories/CategoriesComponent'
import NewsletterComponent from '../components/Newsletter/NewsletterComponent'
import TestimoniesComponent from '../components/Testimonies/TestimoniesComponent'
import { motion } from 'framer-motion'

const Home = () => {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
            <HeaderComponent/>
            <NewsletterComponent/>
            <CategoriesComponent/>
            <TestimoniesComponent/>
        </motion.div>
    )
}

export default Home