import { formatedPrice } from "../../utilities/utils";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductListComponent({ products }) {
  const {addToCart } = useCart()

  return (
    <div>
      <div class="bg-white py-6 sm:py-8 lg:py-12">
        <div class="mx-auto max-w-7xl px-4">
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div key={product.id}>
                <Link to={`/item/${product.id}`} class="group relative block h-96 overflow-hidden rounded-t-lg bg-gray-100">
                  <img src={product.img} loading="lazy" alt={product.name} class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                </Link>
                <div class="flex-col items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4 shadow">
                  <div className="flex items-start justify-between my-2">
                    <div class="flex flex-col">
                      <Link to={`/item/${product.id}`} class="font-bold text-gray-800 transition duration-100 hover:text-gray-500">{product.name}</Link>
                    </div>
                    <div class="flex flex-col items-end">
                      <span class="font-bold text-gray-600">{formatedPrice(product)}</span>
                    </div>
                  </div>
                  <div class="flex">
                    {product.stock > 0 
                    ? 
                    (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(product)}
                        className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Añadir al carrito
                      </motion.button>
                    ) 
                    : 
                    (
                      <button
                        className="mt-2 flex w-full items-center justify-center rounded-md border border-gray-300 bg-gray-300 px-8 py-3 text-base font-medium text-gray-500 cursor-not-allowed"
                        disabled
                      >
                        Sin stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
  