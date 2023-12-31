import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { getAuth } from "firebase/auth";

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const db = getFirestore();
    const {user} = useUser()    

    useEffect(() => {   
        const fetchCart = () => {
            if (user) {
                const userCartRef = collection(db, 'users', user.uid, 'cart');
                getDocs(userCartRef)
                .then((cartSnapshot) => {
                    setCart(cartSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                }).catch((error) => {
                    console.error('Error fetching cart:', error);
                }).finally(() => {
                    setLoading(false)
                });
            } else {
              setCart([]);
            }
        }
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

    const addToCart = (product) => {
        if (user) {
            const cartItemDocRef = doc(db, `users/${user.uid}/cart` , product.id);
            console.log(product)
            getDoc(cartItemDocRef)
            .then((cartItemDoc) => {
                if (cartItemDoc.exists()) {
                    // Update an existing document
                    updateDoc(cartItemDocRef, product)
                        .then(() => fetchCart())
                        .catch((error) => console.error('Error updating cart item:', error))
                        .finally(()=> {setLoading(false)});
                } else {
                    // Create a new document
                    addDoc(cartItemDocRef, product)
                    .then(() => fetchCart())
                    .catch((error) => console.error('Error adding to cart:', error))
                    .finally(()=> {setLoading(false)});
                }}
            ).catch((error) => {
                console.error('Error checking cart item:', error);
            }).finally(() => {
                setLoading(false)
            });
        }
    };

    const removeFromCart = (itemId) => {
        if (user) {
            const userCartItemRef = doc(db, 'users', user.uid, 'cart', itemId);
        
            deleteDoc(userCartItemRef)
            .then(() => fetchCart())
            .catch((error) => {
                console.error('Error checking cart item:', error);
            }).finally(() => {
                setLoading(false)
            });
        }
    };

    const clearCart = () => {
        if (user) {
          const userCartRef = collection(db, 'users', user.uid, 'cart');
      
          getDocs(userCartRef)
            .then((cartSnapshot) => {
              const deletePromises = cartSnapshot.docs.map((doc) => deleteDoc(doc.ref));
              return Promise.all(deletePromises);
            })
            .then(() => fetchCart())
            .catch((error) => {
              console.error('Error clearing cart:', error);
            });
        }
      };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
          {children}
        </CartContext.Provider>
      );
}

export const useCart = () => {
    return useContext(CartContext)
}