import React from 'react'
import MainRouter from './router/MainRouter'
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const App = () => {
    return (
        <BrowserRouter>
        <Toaster 
        position="top-right"
        reverseOrder={false}
        />
        <UserProvider>
            <CartProvider>
                <MainRouter/>
            </CartProvider>
        </UserProvider>
        </BrowserRouter>
    )
}

export default App