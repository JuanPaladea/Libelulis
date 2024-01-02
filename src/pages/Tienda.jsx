import React from 'react'
import TiendaHeaderComponent from '../components/TiendaHeader/TiendaHeaderComponent'
import AdemasCompraronComponent from '../components/AdemasCompraron/AdemasCompraronComponent'
import ProductListComponent from '../components/ProductList/ProductListComponent'
import CategoriesComponent from '../components/Categories/CategoriesComponent'
import { useCollection } from '../hooks/useCollection'
import LoaderComponent from '../components/Loader/LoaderComponent'
import ProductListContainerComponent from '../components/ProductListContainer/ProductListContainerComponent'

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
                <ProductListContainerComponent products={productos} />
            )}
            <AdemasCompraronComponent/>
        </>
    )
}

export default Tienda