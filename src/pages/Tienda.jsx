import React from 'react'
import TiendaHeaderComponent from '../components/TiendaHeader/TiendaHeaderComponent'
import AdemasCompraronComponent from '../components/AdemasCompraron/AdemasCompraronComponent'
import ProductListComponent from '../components/ProductList/ProductListComponent'
import CategoriesComponent from '../components/Categories/CategoriesComponent'
import { useCollection } from '../hooks/useCollection'
import LoaderComponent from '../components/Loader/LoaderComponent'

const Tienda = () => {
    const {productos, loading} = useCollection('products')
    
    return (
        <>
            <TiendaHeaderComponent/>
            <CategoriesComponent/>
            {loading ? (
                <LoaderComponent/>
            )
            :
            (
                <ProductListComponent products={productos} />
            )}
            <AdemasCompraronComponent/>
        </>
    )
}

export default Tienda