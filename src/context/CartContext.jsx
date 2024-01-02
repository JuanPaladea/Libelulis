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
        fetchCart()
    }, [user])

    const fetchCart = () => {
        if (user) {
            const userCartRef = collection(db, 'users', user.uid, 'cart');
            getDocs(userCartRef)
            .then((cartSnapshot) => {
                const cartItems = cartSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCart(cartItems);
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
                            quantity: (existingProduct.quantity || 0) + 1,
                        };
                        updateCartItem(productRef, updatedProduct);
                    } else {
                        // Create a new document
                        const newProduct = { ...product, quantity};
                        addToCartItem(productRef, newProduct);
                    }
                })
                .catch((error) => {
                    console.error('Error checking cart item:', error);
                })
                .finally(() => {
                    setLoading(false);
                    toast.success(`${product.name} agregado`)
                });
        } else {
            toast.error('Debe estar logeado para agregar al carrito')
        }
    };
    
    const updateCartItem = (productRef, product) => {
        updateDoc(productRef, product)
        .then(() => fetchCart())
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
            .then(() => fetchCart())
            .catch((error) => {
              console.error('Error updating cart item:', error);
            })
            .finally(() => {
              toast.success('Cantidad actualizada');
            });
        }
    };
    
    const addToCartItem = (productRef, product) => {
        setDoc(productRef, product)
            .then(() => fetchCart())
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
            .then(() => fetchCart())
            .catch((error) => {
                console.error('Error checking cart item:', error);
            }).finally(() => {
                setLoading(false)
                toast.success(`Removido del carrito`)
            });
        }
    };

    const calculateTotalItems = (cartItems) => {
        return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    };
    const totalItems = calculateTotalItems(cart)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems, updateCartItemQuantity }}>
          {children}
        </CartContext.Provider>
      );
}

export const useCart = () => {
    return useContext(CartContext)
}