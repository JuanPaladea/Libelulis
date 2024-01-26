import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import toast from "react-hot-toast";

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [summary, setSummary] = useState(null)
    const [loading, setLoading] = useState(true);
    const db = getFirestore();
    const {user} = useUser()
    const totalPrice = cart.map((item) => item.price * item.quantity).reduce((total, price) => total + price, 0)

    useEffect(() => {
        const fetchCart = async () => {
            if (user) {
                const userCartRef = collection(db, 'users', user.uid, 'cart');
                try {
                const cartSnapshot = await getDocs(userCartRef);
                const cartItems = cartSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCart(cartItems);
                } catch (error) {
                console.error('Error fetching cart:', error);
                // Handle error (e.g., show a notification to the user)
                } finally {
                setLoading(false);
                }
            } else {
                // Fetch from localStorage when the user is not logged in
                fetchCartFromLocalStorage();
                setLoading(false);
            }
        };
    
        const unsubscribe = user
          ? onSnapshot(collection(db, 'users', user.uid, 'cart'), (snapshot) => {
            try {
                if (snapshot) {
                    const cartItems = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setCart(cartItems);
                } else {
                    // Handle the case when snapshot is null or undefined
                    console.error('Firestore snapshot is null or undefined.');
                }
            } catch (error) {
                console.error('Error processing Firestore snapshot:', error);
            } finally {
                // Set loading to false when the data is fetched, regardless of success or failure
                setLoading(false);
            }})
          : () => {};
      
        fetchCart();
    
        return () => {
          if (unsubscribe) {
            unsubscribe(); // Cleanup the listener on component unmount only if it exists
          }
        };
      }, [user]);

    const fetchCartFromLocalStorage = () => {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(localCart);
    };

    const saveCartToLocalStorage = (cartItems) => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    };

    const addToCart = async (product, selectedSize, quantity = 1) => {    
        try {
            if (!selectedSize || !product.sizes[selectedSize]) {
                toast.error('Seleccione un tamaño válido');
                return;
            }
    
            if (quantity > product.sizes[selectedSize]) {
                toast.error(`No hay suficiente stock disponible para ${product.name} en tamaño ${selectedSize}`);
                return;
            } 
    
            const selectedProduct = { 
                name: product.name,
                price: product.price,
                img: product.img, 
                sizes: product.sizes,
                productId: product.id,
                selectedSize, 
                quantity };
    
            if (user) {
                const cartItemDocRef = collection(db, `users/${user.uid}/cart`);
                const productRef = doc(cartItemDocRef, product.id);
    
                const cartItemDoc = await getDoc(productRef);
    
                if (cartItemDoc.exists()) {
                    // Check if there is an existing product with the same ID but different size
                    const existingProduct = cartItemDoc.data();
                    const isDifferentSize = existingProduct.selectedSize !== selectedProduct.selectedSize;
    
                    if (isDifferentSize) {
                        // Add a new line item if the size is different
                        const newProductRef = doc(cartItemDocRef, `${product.id}_${selectedProduct.selectedSize}`);
                        await addToCartItem(newProductRef, selectedProduct);
                    } else {
                        // Update the existing document if the size is the same
                        const updatedProduct = {
                            ...existingProduct,
                            quantity: (existingProduct.quantity || 0) + quantity,
                            selectedSize: selectedProduct.selectedSize,
                        };
                        await updateCartItem(productRef, updatedProduct);
                    }
                } else {
                    // Create a new document if it doesn't exist
                    const newProduct = { ...selectedProduct };
                    await addToCartItem(productRef, newProduct);
                }
                toast.success(`${selectedProduct.name} agregado al carrito`);
            } else {
                const updatedCart = [...cart];
                const existingProductIndex = updatedCart.findIndex((item) => item.id === selectedProduct.id && item.selectedSize === selectedProduct.selectedSize);

                if (existingProductIndex !== -1) {
                    updatedCart[existingProductIndex].quantity += quantity;
                } else {
                    updatedCart.push({ ...selectedProduct });
                }
                setCart(updatedCart);
                saveCartToLocalStorage(updatedCart);
                toast.success(`${product.name} agregado al carrito`);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            // Set loading to false when the data is fetched, regardless of success or failure
            setLoading(false);
        }
    };
    

    const updateCartItem = async (productRef, product) => {
        try {
            await updateDoc(productRef, product);
        } catch (error) {
            console.error('Error updating cart item:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const addToCartItem = async (productRef, product) => {
        try {
            await setDoc(productRef, product);
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setLoading(false);
        }
    };    

    const updateCartItemQuantity = async (product, newQuantity) => {
        try {
            setLoading(true);
    
            if (newQuantity > product.sizes[product.selectedSize]) {
                toast.error(`No hay suficiente stock disponible para ${product.name}`);
                return;
            }
    
            if (user) {
                const cartItemDocRef = collection(db, `users/${user.uid}/cart`);
                const productRef = doc(cartItemDocRef, product.id);
                await updateDoc(productRef, { quantity: newQuantity });
            } else {
                const updatedCart = cart.map((item) => {
                    if (item.id === product.id) {
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                });
    
                setCart(updatedCart);
                saveCartToLocalStorage(updatedCart);
            }
        } catch (error) {
            console.error('Error updating cart item:', error);
        } finally {
            // Set loading to false when the data is fetched, regardless of success or failure
            setLoading(false);
        }
    };
    
      
    const removeFromCart = async (product) => {
        try {
            setLoading(true);
    
            if (user) {
                const cartItemDocRef = collection(db, `users/${user.uid}/cart`);
                const productRef = doc(cartItemDocRef, product.id);
    
                const cartItemDoc = await getDoc(productRef);
    
                if (cartItemDoc.exists()) {
                    // Remove the item from the cart
                    await deleteDoc(productRef);
                    toast.success(`${product.name} eliminado del carrito`);
                }
            } else {
                const updatedCart = cart.filter((item) => item.id !== product.id);
    
                setCart(updatedCart);
                saveCartToLocalStorage(updatedCart);
                toast.success(`${product.name} eliminado del carrito`);
            }
        } catch (error) {
            console.error('Error removing from cart:', error.message);
        } finally {
            setLoading(false);
        }
    };    

    const checkout = async (totalWithShipping, billingData) => {
        if (user && cart.length > 0) {
            setLoading(true);
            const compraCollectionRef = collection(db, 'compras');
            const newCompraDocRef = doc(compraCollectionRef);
            
            const updateStockPromises = cart.map(async (item) => {
                const productRef = doc(db, 'products', item.productId);
    
                try {
                    const productSnapshot = await getDoc(productRef);
                    const sizesData = productSnapshot.data().sizes;
                    const currentStock = sizesData[item.selectedSize];
    
                    if (currentStock >= item.quantity) {
                        const newStock = currentStock - item.quantity;
                        sizesData[item.selectedSize] = newStock;
                        await updateDoc(productRef, { sizes: sizesData });
                    } else {
                        throw new Error(`Insufficient stock for product: ${item.name} (${item.selectedSize}). Current stock: ${currentStock}, Quantity requested: ${item.quantity}`);
                    }
                } catch (error) {
                    console.error('Error updating product stock:', error);
                    throw error;
                }
            });
            
            try {
                await Promise.all(updateStockPromises);
    
                const compraData = {
                    user: [user.uid, user.email],
                    Direccion: billingData,
                    items: cart,
                    total: totalWithShipping,
                    timestamp: new Date(),
                };
                
                await setDoc(newCompraDocRef, compraData);
                
                // Clear the user's cart collection after a successful purchase
                const cartCollectionRef = collection(db, `users/${user.uid}/cart`);
                const cartQuerySnapshot = await getDocs(cartCollectionRef);
                
                cartQuerySnapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                });
                
                // Clear the local cart state after successful purchase
                setCart([]);
                    
                toast.success('Compra realizada con éxito');
            } catch (error) {
                console.error('Error during checkout:', error);
                toast.error('Error al realizar la compra');
            } finally {
                setLoading(false);
            }
        } else if (cart.length <= 0) {
            toast.error('El carrito está vacío');
        } else if (!user) {
            toast.error('El usuario no está logeado');
        }
    };
    

    const calculateTotalItems = (cartItems) => {
        return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    };
    const totalItems = calculateTotalItems(cart)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems, updateCartItemQuantity, fetchCartFromLocalStorage, checkout, totalPrice, summary, loading, setLoading, }}>
          {children}
        </CartContext.Provider>
      );
}

export const useCart = () => {
    return useContext(CartContext)
}