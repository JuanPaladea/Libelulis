import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { toast } from 'react-toastify';
import { redirect, unstable_HistoryRouter, useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const auth = getAuth();
    const navigate = useNavigate()
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, [auth]);

    const createUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            toast.success('Usuario creado con éxito')
            navigate('/Iniciar-Sesion')
        })
        .catch((error) => {
            console.log(error)
            toast.error(error.message)
        });
    }

    const loginUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            toast.success('Sesión iniciada con éxito')
            navigate('/Tienda')
        })
        .catch((error) => {
            console.log(error)
            toast.error(error.message)
        });
    }

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider)
        .then(() => {
            return getRedirectResult(auth)
        })  
        .then((result) => {
            if (result.user) {
                toast.success('logeado con exito')
            } else {
                toast.error('Error al iniciar con google')
            }
        })
        .catch((error) => {
            console.error(error);
            toast.error('Hubo un problema durante la autenticación con Google');
        })
        .finally(
            navigate('/')
        );
    }

    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                navigate('/')
                toast.success('Sesión finalizada')
            })
            .catch((error) => {
                console.error(error);
                toast.error('Failed to sign out');
            });
    }

    const value = {
        user,
        signInWithGoogle,
        signOutUser,
        createUser,
        loginUser,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}