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
import Admin from '../pages/Admin'
import AdminProductos from '../pages/AdminProductos'
import AdminContactos from '../pages/AdminContactos'
import AdminCompras from '../pages/AdminCompras'
import CheckOutSummary from '../pages/CheckOutSummary'

const MainRouter = () => {
    return (
            <div>
                <CartComponent/>
                <NavBarComponent/>
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/Tienda' element={<Tienda />}/>
                    <Route path='/Sobre-Nosotros' element={<SobreNosotros />}/>
                    <Route path='/Contacto' element={<Contacto />}/>
                    <Route path='/Iniciar-Sesion' element={<Login />}/>
                    <Route path='/Registrarse' element={<Register />}/>
                    <Route path='/Checkout' element={<Checkout />}/>
                    <Route path='/Summary' element={<CheckOutSummary/>}/>
                    <Route path='/Error' element={<Error />}/>
                    <Route path='/Usuario' element={<Usuario />}/>
                    <Route path='/Admin' element={<Admin />}/>
                    <Route path='/Admin-Productos' element={<AdminProductos />}/>
                    <Route path='/Admin-Contactos' element={<AdminContactos />}/>
                    <Route path='/Admin-Compras' element={<AdminCompras />}/>
                    <Route path="/item/:id" element={<Item/>}/>
                </Routes>
                <FooterComponent/>
            </div>
    )
}

export default MainRouter