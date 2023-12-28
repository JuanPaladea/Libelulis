import React from 'react'
import TiendaHeaderComponent from '../components/TiendaHeader/TiendaHeaderComponent'
import AdemasCompraronComponent from '../components/AdemasCompraron/AdemasCompraronComponent'
import ProductListComponent from '../components/ProductList/ProductListComponent'
import CategoriesComponent from '../components/Categories/CategoriesComponent'
import {useProductos} from '../hooks/useProductos'

const Tienda = () => {
    const {products} = useProductos()
    return (
        <>
            <TiendaHeaderComponent/>
            <CategoriesComponent/>
            <ProductListComponent products={products}/>
            <AdemasCompraronComponent/>
        </>
    )
}

export default Tienda