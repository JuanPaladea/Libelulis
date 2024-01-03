import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { toast } from "react-toastify";

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const db = getFirestore();
    const {user} = useUser()

    useEffect(() => {
        if (user) {
            fetchCartFromFirestore()
        } else {
            fetchCartFromLocalStorage()
            setLoading(false)
        }
    }, [user])

    const fetchCartFromFirestore = () => {
        if (user) {
            const userCartRef = collection(db, 'users', user.uid, 'cart');
            getDocs(userCartRef)
            .then((cartSnapshot) => {
                const cartItems = cartSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                if (cartItems.length === 0 && cart.length > 0) {
                    cart.forEach((product) => {
                      const productRef = doc(userCartRef, product.id);
                      addToCartItem(productRef, product);
                    });
                } else {
                    setCart(cartItems);
                }
            })
            .catch((error) => {
                console.error('Error fetching cart:', error);
                // Handle error (e.g., show a notification to the user)
            })
            .finally(() => {
                setLoading(false);
            });
        }
    };

    const fetchCartFromLocalStorage = () => {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(localCart);
    };

    const saveCartToLocalStorage = (cartItems) => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    };

    const addToCart = (product, quantity = 1) => {    
        if (user) {
            const cartItemDocRef = collection(db, `users/${user.uid}/cart`);
            const productRef = doc(cartItemDocRef, product.id);
            getDoc(productRef)
                .then((cartItemDoc) => {
                    if (cartItemDoc.exists()) {
                        // Update an existing document
                        const existingProduct = cartItemDoc.data();
                        const updatedProduct = {
                            ...existingProduct,
                            quantity: (existingProduct.quantity || 0) + quantity,
                        };
                        updateCartItem(productRef, updatedProduct);
                    } else {
                        // Create a new document
                        const newProduct = { ...product, quantity};
                        addToCartItem(productRef, newProduct);
                    }
                    toast.success(product.name + ' agregado al carrito')
                })
                .catch((error) => {
                    console.error('Error checking cart item:', error);
                })
        } else {
            const updatedCart = [...cart];
            const existingProductIndex = updatedCart.findIndex((item) => item.id === product.id);

            if (existingProductIndex !== -1) {
                updatedCart[existingProductIndex].quantity += quantity;
            } else {
                updatedCart.push({ ...product, quantity });
            }
            setCart(updatedCart);
            saveCartToLocalStorage(updatedCart);
            toast.success(`${product.name} agregado al carrito`);
        }
    }
    
    const updateCartItem = (productRef, product) => {
        updateDoc(productRef, product)
        .then(() => {
            fetchCartFromFirestore()
            updateLocalCart();
        })
        .catch((error) => {
            console.error('Error updating cart item:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const updateCartItemQuantity = (product, newQuantity) => {
        if (user) {
          const cartItemDocRef = collection(db, `users/${user.uid}/cart`);
          const productRef = doc(cartItemDocRef, product.id);
    
          updateDoc(productRef, { quantity: newQuantity })
            .then(() => fetchCartFromFirestore())
            .catch((error) => {
              console.error('Error updating cart item:', error);
            })
            .finally(() => {
              toast.success('Cantidad actualizada');
            });
        } else {
            const updatedCart = cart.map((item) => {
                if (item.id === product.id) {
                  return { ...item, quantity: newQuantity };
                }
                return item;
            });
            setCart(updatedCart);
            saveCartToLocalStorage(updatedCart);
            toast.success('Cantidad actualizada');
        }
    };
    
    const addToCartItem = (productRef, product) => {
        setDoc(productRef, product)
            .then(() => fetchCartFromFirestore())
            .catch((error) => {
                console.error('Error adding to cart:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const removeFromCart = (itemId) => {
        if (user) {
            const cartItemDocRef = collection(db, `users/${user.uid}/cart/`);
            const ProductRef = doc(cartItemDocRef, itemId)
        
            deleteDoc(ProductRef)
            .then(() => {
                const updatedLocalCart = cart.filter((item) => item.id !== itemId);
                setCart(updatedLocalCart);
                saveCartToLocalStorage(updatedLocalCart);
                setLoading(false);
                toast.success(`Eliminado del carrito`)            
            })
            .catch((error) => {
                console.error('Error checking cart item:', error);
            })
        } else {
            const updatedCart = cart.filter((item) => item.id !== itemId);
            setCart(updatedCart);
            saveCartToLocalStorage(updatedCart);
            toast.success(`Eliminado del carrito`);
        }
    };

    const updateLocalCart = () => {
        if (user) {
          saveCartToLocalStorage(cart);
        }
    };

    const calculateTotalItems = (cartItems) => {
        return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    };
    const totalItems = calculateTotalItems(cart)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems, updateCartItemQuantity, fetchCartFromLocalStorage, }}>
          {children}
        </CartContext.Provider>
      );
}

export const useCart = () => {
    return useContext(CartContext)
}