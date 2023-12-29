import React from 'react'
import MainRouter from './router/MainRouter'
import { CartOpenProvider } from './context/CartOpenContext'
import { CartProvider } from './context/CartContext'

const App = () => {
    return (
        <CartProvider>
            <CartOpenProvider>
                <MainRouter/>
            </CartOpenProvider>
        </CartProvider>
    )
}

export default App