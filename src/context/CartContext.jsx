import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { getAuth } from "firebase/auth";

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const db = getFirestore();
    const cartsCollection = collection(db, 'carts')  
    const {user} = useUser()    

    useEffect(() => {   
        if (user) {
            const userCartRef = collection(db, 'users', user.uid, 'cart');
            getDocs(userCartRef)
            .then((snapshot) => {
                setCart(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })))
            }).catch(() => {
                setError(true)
            }).finally(setLoading(false))
        }
    }, [cartsCollection, user])

    const addToCart = (product) => {
        if (user) {
            const userCartRef = collection(db, 'users', user.uid, 'cart');
            addDoc(userCartRef, product)
            .then(
                setCart((prevCart) => [...prevCart, product])
            ).catch(() => {
                setError(true)
            }).finally(() => setLoading(false))
        }
    }

    const removeFromCart = (productId) => {
        const userCartItemRef = doc(db, 'users', user.uid, 'cart', productId);
        deleteDoc(userCartItemRef)
        .then(
            setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
        ).catch(() => {
            setError(true)
        }).finally(() => setLoading(false))
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