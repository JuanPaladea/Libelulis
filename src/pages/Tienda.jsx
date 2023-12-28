import React from 'react'
import TiendaHeaderComponent from '../components/TiendaHeader/TiendaHeaderComponent'
import AdemasCompraronComponent from '../components/AdemasCompraron/AdemasCompraronComponent'
import ProductListComponent from '../components/ProductList/ProductListComponent'
import CategoriesComponent from '../components/Categories/CategoriesComponent'

const Tienda = () => {
    return (
        <>
            <TiendaHeaderComponent/>
            <CategoriesComponent/>
            <ProductListComponent/>
            <AdemasCompraronComponent/>
        </>
    )
}

export default Tienda