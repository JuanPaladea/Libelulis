import React from 'react'
import TiendaHeaderComponent from '../components/TiendaHeader/TiendaHeaderComponent'
import AdemasCompraronComponent from '../components/AdemasCompraron/AdemasCompraronComponent'
import ProductListComponent from '../components/ProductList/ProductListComponent'
import CategoriesComponent from '../components/Categories/CategoriesComponent'
import { useCollection } from '../hooks/useCollection'

const Tienda = () => {

    const {productos} = useCollection('products')

    return (
        <>
            <TiendaHeaderComponent/>
            <CategoriesComponent/>
            <ProductListComponent products={productos} />
            <AdemasCompraronComponent/>
        </>
    )
}

export default Tienda