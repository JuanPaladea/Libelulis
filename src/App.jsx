import React from 'react'
import MainRouter from './router/MainRouter'
import { CartOpenProvider } from './context/CartOpenContext'

const App = () => {
    return (
        <CartOpenProvider>
            <MainRouter/>
        </CartOpenProvider>
    )
}

export default App