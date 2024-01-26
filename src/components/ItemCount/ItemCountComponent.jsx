import { useState } from "react"
import { useCart } from "../../context/CartContext"

export default function ItemCountComponent({product}) {
    const [count, setCount] = useState(product.quantity)
    const {updateCartItemQuantity} = useCart()

    const handleQuantityChange = (e) => {
        const newCount = parseInt(e.target.value, 10);
        setCount(newCount);
        updateCartItemQuantity(product, newCount);
    };

    return (
        <div class="flex items-center justify-center">
            <button
                onClick={() => setCount(Math.max(count - 1, 1))}
                class="group border border-gray-400 rounded-l-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50">
                <svg class="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                    width="22" height="22" viewBox="0 0 22 22" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 11H5.5" stroke="" stroke-width="1.6"
                        stroke-linecap="round" />
                    <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                        stroke-linecap="round" />
                    <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                        stroke-linecap="round" />
                </svg>
            </button>
            <input 
                value={count}
                type="text"
                class="font-semibold w-8 text-gray-900 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50 focus-within:bg-gray-50 outline-0"
                placeholder="1"/>
            <button
                onClick={() => setCount(Math.min(count + 1, 6))}
                class="group border border-gray-400 rounded-r-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50">
                <svg class="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                    width="22" height="22" viewBox="0 0 22 22" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-width="1.6"
                        stroke-linecap="round" />
                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                        stroke-width="1.6" stroke-linecap="round" />
                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                        stroke-width="1.6" stroke-linecap="round" />
                </svg>
            </button>
        </div>
    )
}
