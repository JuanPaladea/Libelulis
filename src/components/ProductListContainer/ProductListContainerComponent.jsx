import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import ProductListComponent from '../ProductList/ProductListComponent'
import { Link } from 'react-router-dom'

const sortOptions = [
  { name: 'Precio: Más bajo a más alto', current: false },
  { name: 'Precio: Más alto a más bajo', current: false },
]

const categories = [
  { name: 'Buzo', current: false },
  { name: 'Remera', current: false },
  { name: 'Campera', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductListContainerComponent({products}) {

  const [orderedProducts, setOrderedProducts] = useState([...products]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  useEffect(() => {
    // Function to update the orderedProducts array based on selectedCategory and selectedSortOption
    const updateOrderedProducts = () => {
      let filteredProducts = [...products];

      if (selectedCategory) {
        filteredProducts = filteredProducts.filter((product) =>
          product.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      }

      const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (selectedSortOption === 'precio: más bajo a más alto') {
          return a.price - b.price;
        } else if (selectedSortOption === 'precio: más alto a más bajo') {
          return b.price - a.price;
        }
        return 0;
      });

      setOrderedProducts(sortedProducts);
    };

    updateOrderedProducts();
  }, [products, selectedCategory, selectedSortOption]);

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Tienda</h1>

            <div className="flex items-center">
            
            <Menu as="div" className="relative inline-block text-left mr-6">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Categorías
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item key="Todos los productos">
                          <Link
                            onClick={() => setSelectedCategory(false)}
                            className={classNames(
                              'text-gray-500',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Todos los productos
                          </Link>
                        </Menu.Item>
                      {categories.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <Link
                              onClick={() => setSelectedCategory(option.name)}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Ordenar
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <Link
                              onClick={() => setSelectedSortOption(option.name.toLowerCase())}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <ProductListComponent products={orderedProducts} />
        </main>
      </div>
    </div>
  )
}
