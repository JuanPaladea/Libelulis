export const formatedPrice = (product) => {
    return product.price.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}

export const formatedTotalPrice = (product) => {
    return ((formatedPrice(product).replace(/[^\d]/g, '')/100)*product.quantity).toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}