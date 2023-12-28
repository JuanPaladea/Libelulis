import React from 'react'
import commerce from '../lib/commerce'

const useCart = () => {

    const getCart = () => {
        commerce.cart.retrieve().then((cart) => console.log(cart))
    }

    const refreshCart = () => {
        commerce.cart.refresh().then((cart) => console.log(cart));
    }

    const addToCart = (productId, q) => {
        commerce.cart.add(productId, q).then((response) => console.log(response));
    }

    const updateLineItemQuantity = (itemId, q) => {
        commerce.cart.update(itemId, { quantity: q }).then(response => console.log(response));
    }

    const getCartContent = () => {
        commerce.cart.contents().then((items) => console.log(items));
    }

    const removeItemFromCart = (itemId) => {
        commerce.cart.remove(itemId).then((response) => console.log(response));
    }

    const deleteCart = () => {
        commerce.cart.delete().then((response) => console.log(response));
    }

    const retrieveCartId = () => {
        commerce.cart.id().then((cartId) => console.log(cartId));
    }

    return { getCart, refreshCart, addToCart, updateLineItemQuantity, getCartContent, removeItemFromCart, deleteCart, retrieveCartId } 
}

export default useCart