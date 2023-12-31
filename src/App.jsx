import React from 'react'
import MainRouter from './router/MainRouter'
import { CartOpenProvider } from './context/CartOpenContext'
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'

const App = () => {
    return (
        <UserProvider>
            <CartProvider>
                <CartOpenProvider>
                    <MainRouter/>
                </CartOpenProvider>
            </CartProvider>
        </UserProvider>
    )
}

export default App