import React from 'react'
import MainRouter from './router/MainRouter'
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'

const App = () => {
    return (
        <BrowserRouter>
        <UserProvider>
            <CartProvider>
                <MainRouter/>
                <ToastContainer 
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
            </CartProvider>
        </UserProvider>
        </BrowserRouter>
    )
}

export default App