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
  { id: "buzo", name: 'Buzos', current: false },
  { id: "remera", name: 'Remeras', current: false },
  { id: "campera", name: 'Camperas', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductListContainerComponent({products}) {

  const [orderedProducts, setOrderedProducts] = useState([...products]);
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);


  useEffect(() => {
    // Function to update the orderedProducts array based on selectedCategory and selectedSortOption
    const updateOrderedProducts = () => {
      let filteredProducts = [...products];

      if (selectedCategories.length > 0) {
        // Filter products based on selected categories
          filteredProducts = filteredProducts.filter((product) =>
          selectedCategories.includes(product.category.toLowerCase())
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

      const searchedProducts = sortedProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setOrderedProducts(searchedProducts);
    };

    updateOrderedProducts();
  }, [products, selectedCategories, selectedSortOption, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    // Toggle the selected category
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        // If category is already selected, remove it
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        // Otherwise, add the category
        return [...prevSelectedCategories, category];
      }
    });
  };

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
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
                            onClick={() => setSelectedCategories([])}
                            className={classNames(
                              'text-gray-500',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Todos los productos
                          </Link>
                        </Menu.Item>
                        {categories.map((option) => (
                          <Menu.Item key={option.id}>
                            {() => (
                              <label className="px-4 flex items-center">
                                <input
                                  type="checkbox"
                                  name="category"
                                  checked={selectedCategories.includes(option.id)}
                                  onChange={() => handleCategoryChange(option.id)}
                                  className="form-checkbox h-4 w-4 text-blue-500"
                                />
                                <span
                                  className='text-gray-500 ml-2 block px-4 py-2 text-sm'
                                >
                                  {option.name}
                                </span>
                              </label>
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
          <form className='mt-4'>   
            <label for="default-search" class="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                type="search" 
                id="default-search" 
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Busca tu producto..."
                value={searchQuery} 
                onChange={handleSearchChange}/>
            </div>
          </form>
        </main>
          <ProductListComponent products={orderedProducts} />
      </div>
    </div>
  )
}
