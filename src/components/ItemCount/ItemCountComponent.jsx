import { useState } from "react"
import { useCart } from "../../context/CartContext"

export default function ItemCountComponent({product}) {
    const [count, setCount] = useState(product.quantity)
    const {updateCartItemQuantity} = useCart()

    const handleQuantityChange = (e) => {
        const newCount = +(e.target.value)
        setCount(newCount)
        updateCartItemQuantity(product, newCount)
    }

    return (
        <div>
        <p className="text-gray-500">Cantidad:
        <select id="quantity" value={count} onChange={handleQuantityChange}>
            {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
            <option key={value} value={value}>
                {value}
            </option>
            ))}
        </select>
        </p>
        </div>
    )
}
