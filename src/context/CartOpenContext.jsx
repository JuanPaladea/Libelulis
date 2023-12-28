import { createContext, useContext, useState } from "react";

const CartOpenContext = createContext()

export const CartOpenProvider = ({ children }) => {
    const [cartOpen, setCartOpen] = useState(false)

    return (
        <CartOpenContext.Provider value={{ cartOpen, setCartOpen }}>
          {children}
        </CartOpenContext.Provider>
      );
}

export const useCartOpen = () => {
    return useContext(CartOpenContext)
}