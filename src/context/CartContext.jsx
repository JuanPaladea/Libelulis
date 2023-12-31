import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const db = getFirestore();
    const cartsCollection = collection(db, 'carts')        

    useEffect(() => {
        getDocs(cartsCollection)
        .then((snapshot) => {
            setCart(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })))
        }).catch(() => {
            setError(true)
        }).finally(setLoading(false))
    }, [cartsCollection, cart, setCart, setLoading, setError])

    const addToCart = (product) => {
        addDoc(cartsCollection, product)
        .then(
            setCart([...cart, product])
        ).catch(() => {
            setError(true)
        }).finally(setLoading(false))
    }

    const removeFromCart = (productId) => {
        const cartDoc = doc(db, 'carts', productId); 
        deleteDoc(cartDoc)
        .then(
            setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
        ).catch(() => {
            setError(true)
        }).finally(setLoading(false))
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
          {children}
        </CartContext.Provider>
      );
}

export const useCart = () => {
    return useContext(CartContext)
}