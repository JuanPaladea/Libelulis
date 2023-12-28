import React, { useEffect, useState } from 'react'
import commerce from '../lib/commerce';

const useProductos = () => {
    const [products, setProducts] = useState([])

    const fetchProducts = () => {
        commerce.products.list()
            .then((products) => {
                setProducts(products.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }
    
    useEffect(() => {
        fetchProducts() 
    }, [])

    return {products}
}

const useProduct = (productId) => {
    const [product, setProduct] = useState(null);
  
    const fetchProduct = () => {
      commerce.products
        .retrieve(productId)
        .then((product) => {
          setProduct(product);
        })
        .catch((error) => {
          console.log('There was an error fetching the product', error);
        });
    };
  
    useEffect(() => {
        fetchProduct();
    }, [productId]);
    
    return { product, fetchProduct };
};

export { useProductos, useProduct };
