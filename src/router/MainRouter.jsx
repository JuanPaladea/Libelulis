import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import NavBarComponent from '../components/NavBar/NavBarComponent'
import FooterComponent from '../components/Footer/FooterComponent'
import Tienda from '../pages/Tienda'
import SobreNosotros from '../pages/SobreNosotros'
import Contacto from '../pages/Contacto'
import Item from '../pages/Item'
import Login from '../pages/Login'
import Register from '../pages/Register'
import CartComponent from '../components/Cart/CartComponent'
import Checkout from '../pages/Checkout'
import Error from '../pages/Error'
import Usuario from '../pages/Usuario'

const MainRouter = () => {
    return (
        <BrowserRouter>
            {<CartComponent/>}
            <NavBarComponent/>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/Tienda' element={<Tienda />}/>
                <Route path='/Sobre-Nosotros' element={<SobreNosotros />}/>
                <Route path='/Contacto' element={<Contacto />}/>
                <Route path='/Iniciar-Sesion' element={<Login />}/>
                <Route path='/Registrarse' element={<Register />}/>
                <Route path='/Checkout' element={<Checkout />}/>
                <Route path='/Error' element={<Error />}/>
                <Route path='/Usuario' element={<Usuario />}/>
                <Route path="/item/:id" element={<Item/>}/>
            </Routes>
            <FooterComponent/>
        </BrowserRouter>
    )
}

export default MainRouter