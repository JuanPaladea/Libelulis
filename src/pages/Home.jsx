import React from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import CategoriesComponent from '../components/Categories/CategoriesComponent'
import NewsletterComponent from '../components/Newsletter/NewsletterComponent'
import TestimoniesComponent from '../components/Testimonies/TestimoniesComponent'

const Home = () => {
    return (
        <>
            <HeaderComponent/>
            <NewsletterComponent/>
            <CategoriesComponent/>
            <TestimoniesComponent/>
        </>
    )
}

export default Home