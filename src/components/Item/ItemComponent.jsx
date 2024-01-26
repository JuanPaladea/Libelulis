import { useState } from "react";
import { useCart } from "../../context/CartContext"
import { motion } from "framer-motion";

export default function ItemComponent({product}) {
  const {addToCart} = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [count, setCount] = useState(1)
  const [selectedImage, setSelectedImage] = useState(product.img);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize, count);
      // You can reset the size and count after adding to the cart if needed
      setCount(1);
    } else {
      // Handle case where no size is selected
      console.error("Please select a size");
    }
  };

  const sizeList = ['S', 'M', 'L', 'XL'];

  return (
    <section class="py-10 relative bg-gray-100">
    <div class="mx-auto max-w-7xl px-4">
        <div class="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16">
            <div class="max-lg:mx-auto lg:w-1/2 flex flex-col h-fit">
                <h2 class="mb-2 font-manrope font-bold text-3xl leading-10 text-gray-900">{product.name}
                </h2>
                <div class="flex flex-col sm:flex-row sm:items-center mb-6">
                  <h6
                    class="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                    {product.price .toLocaleString('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}  
                  </h6>
                </div>
                <p class="text-gray-500 text-base font-normal mb-8 ">
                    {product.descripcion || 
                    <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                    <li class="text-gray-400"><span class="text-gray-600"><span class="font-bold">Calidad Premium</span>: Destaca la calidad excepcional de tus productos de ropa. Puedes mencionar la elección de materiales de alta gama, la artesanía cuidadosa o cualquier característica única que garantice durabilidad y comodidad.</span></li>
                    <li class="text-gray-400"><span class="text-gray-600"><span class="font-bold">Diseño Exclusivo</span>: Resalta la originalidad y exclusividad de tus diseños. Si hay detalles únicos, patrones distintivos o colaboraciones especiales, asegúrate de incluirlos en los highlights para atraer a aquellos que buscan prendas únicas y a la moda.</span></li>
                    <li class="text-gray-400"><span class="text-gray-600"><span class="font-bold">Sostenibilidad y Responsabilidad Ambiental</span>: Si tus productos están fabricados de manera sostenible o si tu empresa sigue prácticas respetuosas con el medio ambiente, es fundamental incluirlo en tus highlights. La conciencia ambiental es una característica cada vez más valorada por los consumidores.</span></li>
                    <li class="text-gray-400"><span class="text-gray-600"><span class="font-bold">Confort y Funcionalidad</span>:Si tus prendas ofrecen un nivel excepcional de comodidad o incluyen características funcionales específicas (como bolsillos ocultos, tejidos transpirables, etc.), asegúrate de destacarlo. Los clientes aprecian la combinación de estilo y practicidad en la ropa que compran.</span></li>
                  </ul>}
                </p>
                <div class="block w-full">
                    <div class="text">
                        <div class="flex items-center justify-start gap-3 md:gap-6 relative mb-6 ">
                          <div className="mr-6">
                            <p class="font-medium text-lg leading-8 text-gray-900 mb-4">Color</p>
                            {product.colors.map((color) => (
                              <button
                                key={color}
                                className={`p-1 mb-2 mr-4 w-7 h-7 border border-black shadow`}
                                style={{ backgroundColor: color }}
                              ></button>
                            ))}
                          </div>
                          <div>
                            <p class="font-medium text-lg leading-8 text-gray-900 mb-4">Stock</p>
                            <div class="mb-2 mr-4">
                                {product.sizes[selectedSize]}
                            </div>
                          </div>
                        </div>
                        <div class="block w-full my-8">
                            <p class="font-medium text-lg leading-8 text-gray-900 mb-4">Tamaño</p>
                            <div class="grid grid-cols-2 min-[400px]:grid-cols-4 gap-3">
                                {sizeList.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => handleSizeSelect(size)}
                                        className={`px-3 py-1 border rounded-md ${selectedSize === size ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            <div class="flex items-center justify-center w-full">
                                <button
                                    onClick={() => setCount(Math.max(count - 1, 1))}
                                    class="group py-4 px-6 border border-gray-400 rounded-l-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50">
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
                                    class="font-semibold text-gray-900 text-lg py-[13px] px-6 w-full lg:max-w-[118px] border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50 focus-within:bg-gray-50 outline-0"
                                    placeholder="1"/>
                                <button
                                        onClick={() => setCount(Math.min(count + 1, 6))}
                                    class="group py-4 px-6 border border-gray-400 rounded-r-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50">
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
                            {product.sizes[selectedSize] > 0 ? (
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={handleAddToCart}
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
            <div class="lg:w-1/2 max-lg:mx-auto lg:h-full">
              <div class="col-span-4">
                  <img src={selectedImage} alt={product.name}
                      class="w-full h-full xl:min-w-[608px] aspect-square object-cover object-center"/>
              </div>
              <div className="grid grid-cols-4 gap-4 lg:gap-6 mt-4 lg:mt-6">
                {[product.img, product.img2, product.img3].map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={product.name}
                    className="w-full h-full cursor-pointer border-2 border-gray-50 transition-all duration-500 hover:border-indigo-600"
                    onClick={() => handleImageSelect(image)}
                  />
                ))}
              </div>
            </div>
        </div>
    </div>
  </section>  
  )
}