import React from 'react'
import MainRouter from './router/MainRouter'
import { CartOpenProvider } from './context/CartOpenContext'
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <UserProvider>
            <CartProvider>
                <CartOpenProvider>
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
                </CartOpenProvider>
            </CartProvider>
        </UserProvider>
    )
}

export default App