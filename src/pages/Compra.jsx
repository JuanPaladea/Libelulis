import React, { useEffect, useState } from 'react'
import CompraComponent from '../components/Compra/CompraComponent'
import Error from '../pages/Error'
import { useParams } from 'react-router-dom'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'

const Compra = () => {
    const {id} = useParams()
    const [compra, setCompra] = useState('')
    
    useEffect(() => {
        const db = getFirestore();
        const singleProduct = doc(db, 'compras', id);
    
        const unsubscribe = onSnapshot(singleProduct, (snapshot) => {
          setCompra({ id: snapshot.id, ...snapshot.data() });
        });
    
        return () => {
          // Unsubscribe from the snapshot listener when the component unmounts
          unsubscribe();
        };
      }, [id]);

    return (
        <div>
            {compra ? 
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