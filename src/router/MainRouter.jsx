import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import NavBarComponent from '../components/NavBar/NavBarComponent'
import FooterComponent from '../components/Footer/FooterComponent'
import Tienda from '../pages/Tienda'
import SobreNosotros from '../pages/SobreNosotros'
import Contacto from '../pages/Contacto'

const MainRouter = () => {
    return (
        <BrowserRouter>
            <NavBarComponent/>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/Tienda' element={<Tienda />}/>
                <Route path='/Sobre-Nosotros' element={<SobreNosotros />}/>
                <Route path='/Contacto' element={<Contacto />}/>
            </Routes>
            <FooterComponent/>
        </BrowserRouter>
    )
}

export default MainRouter