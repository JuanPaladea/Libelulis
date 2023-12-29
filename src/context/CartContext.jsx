import { createContext, useContext, useEffect, useState } from "react";
import commerce from "../lib/commerce";

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState("");
    
    const getCart = () => {
        commerce.cart
        .retrieve()
        .then((cart) => 
        setCart(cart))
        .catch((error) => {
            console.log('There was an error fetching the cart', error);
        });
    };
    
    useEffect(()=> {
        getCart()
    }, [])

    const addToCart = (productId, q) => {
        commerce.cart
        .add(productId, q)
        .then(() => getCart())
        .catch((error) => console.log(error))
    }

    const updateCart = (productId, q) => {
        commerce.cart
        .update(productId, { quantity: q })
        .then(() => getCart())
        .catch((error) => console.log(error))
    }
    
    const removeItemFromCart = (itemId) => {
        commerce.cart.remove(itemId)
        .then(() => getCart())
        .catch((error) => console.log(error))
    }

    return (
        <CartContext.Provider value={{ cart, getCart, addToCart, updateCart, removeItemFromCart }}>
          {children}
        </CartContext.Provider>
      );
}

export const useCartContext = () => {
    return useContext(CartContext)
}