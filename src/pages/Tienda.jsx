import React from 'react'
import TiendaHeaderComponent from '../components/TiendaHeader/TiendaHeaderComponent'
import AdemasCompraronComponent from '../components/AdemasCompraron/AdemasCompraronComponent'
import { useCollection } from '../hooks/useCollection'
import LoaderComponent from '../components/Loader/LoaderComponent'
import ProductListContainerComponent from '../components/ProductListContainer/ProductListContainerComponent'
import { motion } from 'framer-motion'
import ProductosDestacadosComponent from '../components/ProductosDestacados/ProductosDestacadosComponent'

const Tienda = () => {
    const {productos, loading} = useCollection('products')
    
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
            <TiendaHeaderComponent/>
            <ProductosDestacadosComponent/>
            {loading ? (
                <div className='p-6 w-full h-full flex items-center justify-center'><LoaderComponent/></div>
            )
            :
            (
                <ProductListContainerComponent products={productos} />
            )}
            <AdemasCompraronComponent/>
        </motion.div>
    )
}

export default Tienda