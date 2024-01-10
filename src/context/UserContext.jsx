import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, getRedirectResult, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false)
    const auth = getAuth();
    const navigate = useNavigate()
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          try {
            setUser(user);
            if (user) {
              const userUidDocRef = doc(db, `users/${user.uid}`);
              const userDoc = await getDoc(userUidDocRef);
    
              if (userDoc.exists()) {
                const userData = userDoc.data();
                const adminStatus = userData.isAdmin === true;
                setIsAdmin(adminStatus);
              } else {
                setIsAdmin(false);
              }
            } else {
              setIsAdmin(false);
            }
          } catch (error) {
            console.error(error);
            setIsAdmin(false);
          } finally {
            setLoading(false);
          }
        });
    
        return () => unsubscribe();
      }, [auth]); // Ensure to include auth as a dependency if it's from an outer scope
    

    const createUser = async (email, password, name, lastname) => {
        try {
            setLoading(true)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Update the user profile with custom data
            await updateProfile(user, {
                displayName: `${name} ${lastname}`
            });
    
            // User creation and profile update successful
            toast.success('Usuario creado con éxito');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            // Set loading to false when the data is fetched, regardless of success or failure
            setLoading(false);
        }
    };

    const loginUser = async (email, password) => {
        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password);
            // Login successful
            toast.success('Sesión iniciada con éxito');
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                toast.error('La contraseña es incorrecta. Por favor, inténtalo de nuevo.');
            } else {
                toast.error(error.message);
            }
        } finally {
            // Set loading to false when the data is fetched, regardless of success or failure
            setLoading(false);
        }
    }
    
    const signInWithGoogle = async () => {
        try {
            setLoading(true)
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
        } finally {
            setLoading(false);
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
        } finally {
            setLoading(false);
        }
    };

    const value = {
        loading,
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