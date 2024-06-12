import { formatedPrice } from "../../utilities/utils";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductListComponent({ productos }) {
  const {addToCart } = useCart()

  const initialSizes = productos.reduce((sizes, product) => {
    sizes[product.id] = 'M';
    return sizes;
  }, {});

  const [selectedSizes, setSelectedSizes] = useState(initialSizes);
  
  const sizeList = ['S', 'M', 'L', 'XL'];
  const handleSizeSelect = (size, productId) => {
    setSelectedSizes(prevSizes => ({ ...prevSizes, [productId]: size }));
  };
  
  return (
    <div className="w-full grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {productos.map((product) => (
        <div key={product.id} className="w-full">
          <div>
            <Link to={`/item/${product.id}`} className="group relative block h-80 overflow-hidden rounded-t-lg bg-gray-100">
              <img src={product.img} loading="lazy" alt={product.name} className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </Link>
            <div className="flex-col items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4 shadow">
              <div className="flex flex-col">
                <Link to={`/item/${product.id}`} className="font-bold text-gray-800 transition duration-100 hover:text-gray-500">{product.name}</Link>
              </div>
              <div className="flex flex-col items-start my-2">
                <span className="font-bold text-gray-600">{formatedPrice(product)}</span>
              </div>
              <div className="flex flex-wrap items-center space-x-4">
                <span className="font-bold">Talle:</span>
                {sizeList.map((size) => (
                  <button
                    key={size}
                    className={`px-3 py-1 border rounded-md ${selectedSizes[product.id] === size ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'}`}
                    onClick={() => handleSizeSelect(size, product.id)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="flex mt-2 w-full">
                {product.sizes[selectedSizes[product.id]] > 0 ? (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addToCart(product, selectedSizes[product.id])}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Añadir al carrito
                  </motion.button>
                ) : (
                  <button
                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-gray-300 px-8 py-3 text-base font-medium text-gray-500 cursor-not-allowed"
                    disabled
                  >
                    Sin stock
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
  