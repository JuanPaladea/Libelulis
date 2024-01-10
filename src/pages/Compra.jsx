import React, { useEffect, useState } from 'react'
import CompraComponent from '../components/Compra/CompraComponent'
import Error from '../pages/Error'
import { useParams } from 'react-router-dom'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import LoaderComponent from '../components/Loader/LoaderComponent'

const Compra = () => {
    const {id} = useParams()
    const [compra, setCompra] = useState('')
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const fetchCompra = () => {
        const db = getFirestore();
        const singleProduct = doc(db, 'compras', id);
    
        const unsubscribe = onSnapshot(singleProduct, (snapshot) => {
          setCompra({ id: snapshot.id, ...snapshot.data() });
          setLoading(false);
        }, (error) => {
          console.error('Error fetching compra:', error);
          setLoading(false);
        });
    
        return unsubscribe;
      };
    
      const unsubscribe = fetchCompra();
    
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [id]);

    return (
        <div>
            {loading 
            ? 
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 z-50">
              <LoaderComponent/>
            </div>
            :
            compra 
            ? 
            (
            <CompraComponent compra={compra}/>
            )
            :
            (
            <Error/>
            )}
        </div>
    )
}

export default Compra