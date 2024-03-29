import React, { useEffect, useState } from 'react'
import TiendaHeaderComponent from '../components/TiendaHeader/TiendaHeaderComponent'
import { useCollection } from '../hooks/useCollection'
import LoaderComponent from '../components/Loader/LoaderComponent'
import ProductListContainerComponent from '../components/ProductListContainer/ProductListContainerComponent'
import { motion } from 'framer-motion'

const Tienda = () => {
    const [forceReload, setForceReload] = useState(false);
    const { productos, loading, refetch } = useCollection('products', forceReload);
    
    useEffect(() => {
        // Any logic you need when navigating back to the product list
        // For example, if you want to force a reload when navigating back:
        setForceReload((prev) => !prev);
      }, []);

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
            <TiendaHeaderComponent/>
            {loading ? (
                <div className='p-6 w-full h-full flex items-center justify-center'><LoaderComponent/></div>
            )
            :
            (
                <ProductListContainerComponent products={productos} />
            )}
        </motion.div>
    )
}

export default Tienda