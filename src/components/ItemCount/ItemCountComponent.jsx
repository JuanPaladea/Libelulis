import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function ItemCountComponent({ product }) {
  const [count, setCount] = useState(product.quantity);
  const { updateCartItemQuantity } = useCart();

  const handleQuantityChange = (newCount) => {
    setCount(newCount);
    updateCartItemQuantity(product, newCount);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => handleQuantityChange(Math.max(count - 1, 1))}
        className="group border border-gray-400 rounded-l-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50"
      >
        <svg
          className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
          width="24"
          height="24"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 11H5.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M16.5 11H5.5"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M16.5 11H5.5"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <input
        value={count}
        type="text"
        className="font-semibold w-8 text-gray-900 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50 focus-within:bg-gray-50 outline-0"
        placeholder="1"
        onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
      />
      <button
        onClick={() => handleQuantityChange(Math.min(count + 1, 6))}
        className="group border border-gray-400 rounded-r-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50"
      >
        <svg
          className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
          width="24"
          height="24"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 5.5V16.5M16.5 11H5.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M11 5.5V16.5M16.5 11H5.5"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M11 5.5V16.5M16.5 11H5.5"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
