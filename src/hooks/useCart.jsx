import { useEffect, useState } from "react";
import commerce from "../lib/commerce";

const useCart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const getCart = () => {
        setLoading(true);
        commerce.cart.retrieve()
        .then((cart) => {
          setCart(cart);
        })
        .catch((error) => {
          console.error('Error retrieving cart:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    useEffect(()=> {
        getCart()
    }, [])
    
    const refreshCart = () => {
        setLoading(true);
        commerce.cart.refresh()
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
          commerce.cart.add(productId, q)
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
        commerce.cart.update(itemId, { quantity: q })
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
        commerce.cart.contents()
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
        commerce.cart.remove(itemId)
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
        commerce.cart.delete()
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
        commerce.cart.id()
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

    return {
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
}

export default useCart