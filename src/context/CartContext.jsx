import React, { createContext, useContext, useEffect, useState } from 'react'
import commerce from '../lib/commerce'

export const CartContext = createContext()

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const getCart = () => {
        setLoading(true);
        return commerce.cart.retrieve()
        .then((cart) => {
          setCart(cart);
          return cart;
        })
        .catch((error) => {
          console.error('Error retrieving cart:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    const refreshCart = () => {
        setLoading(true);
        return commerce.cart.refresh()
        .then((cart) => {
          setCart(cart);
          return cart;
        })
        .catch((error) => {
          console.error('Error refreshing cart:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    const addToCart = (productId, q) => {
        setLoading(true);

        const existingItem = cart?.line_items.find((item) => item.product_id === productId);
        if (existingItem) {
          return updateLineItemQuantity(existingItem.id, existingItem.quantity + quantity);
        } else {
          return commerce.cart.add(productId, q)
          .then((response) => {
            setCart(response.cart);
            return response.cart;
          })
          .catch((error) => {
            console.error('Error adding to cart:', error);
          })
          .finally(() => {
            setLoading(false);
          });
        }

    };
  
    const updateLineItemQuantity = (itemId, q) => {
        setLoading(true);
        return commerce.cart.update(itemId, { quantity: q })
        .then((response) => {
          setCart(response.cart);
          return response.cart;
        })
        .catch((error) => {
          console.error('Error updating line item quantity:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    const getCartContent = () => {
        setLoading(true);
        return commerce.cart.contents()
        .then((items) => {
          console.log(items);
          return items;
        })
        .catch((error) => {
          console.error('Error getting cart content:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    const removeItemFromCart = (itemId) => {
        setLoading(true);
        return commerce.cart.remove(itemId)
        .then((response) => {
          setCart(response.cart);
          return response.cart;
        })
        .catch((error) => {
          console.error('Error removing item from cart:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    const deleteCart = () => {
        setLoading(true);
        return commerce.cart.delete()
        .then(() => {
          setCart(null);
        })
        .catch((error) => {
          console.error('Error deleting cart:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    const retrieveCartId = () => {
        setLoading(true);
        return commerce.cart.id()
        .then((cartId) => {
          console.log(cartId);
          return cartId;
        })
        .catch((error) => {
          console.error('Error retrieving cart ID:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    useEffect(() => {
      getCart();
    }, []); // Run once on component mount
  
    const value = {
      cart,
      getCart,
      refreshCart,
      addToCart,
      updateLineItemQuantity,
      getCartContent,
      removeItemFromCart,
      deleteCart,
      retrieveCartId,
      loading,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
  };
  