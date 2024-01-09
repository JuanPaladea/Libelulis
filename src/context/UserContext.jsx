import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const auth = getAuth();
    const navigate = useNavigate()
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);

            if (user) {
                try {
                    const userUidDocRef = doc(db, `users/${user.uid}`);
                    const userDoc = await getDoc(userUidDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        const adminStatus = userData.isAdmin === true;
                        setIsAdmin(adminStatus); // Update admin status
                    } else {
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error(error);
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }
        });
        return () => unsubscribe();
    }, [auth]);

    const createUser = async (email, password, name, lastname) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Update the user profile with custom data
            await updateProfile(user, {
                displayName: `${name} ${lastname}`
            });
    
            // User creation and profile update successful
            toast.success('Usuario creado con éxito');
            navigate('/Iniciar-Sesion');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const loginUser = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Login successful
            toast.success('Sesión iniciada con éxito');
            navigate('/Tienda');
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                toast.error('La contraseña es incorrecta. Por favor, inténtalo de nuevo.');
            } else {
                toast.error(error.message);
            }
        }
    }
    
    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider);
    
            const result = await getRedirectResult(auth);
    
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    // User is authenticated
                    toast.success('Logeado con éxito');
                    navigate('/');
                } else {
                    // No user found
                    toast.error('Error al iniciar sesión con Google');
                }
            });
        } catch (error) {
            console.error(error);
            toast.error('Hubo un problema durante la autenticación con Google');
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
            navigate('/');
            toast.success('Sesión finalizada');
        } catch (error) {
            console.error(error);
            toast.error('Failed to sign out');
        }
    };

    const value = {
        user,
        signInWithGoogle,
        signOutUser,
        createUser,
        loginUser,
        isAdmin,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}