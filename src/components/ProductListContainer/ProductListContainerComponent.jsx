import { useEffect, useState } from 'react'
import ProductListComponent from '../ProductList/ProductListComponent'

export default function ProductListContainerComponent({products}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [orderOption, setOrderOption] = useState('name'); // 'name' or 'price'
  const [orderDirection, setOrderDirection] = useState('asc'); // 'asc' or 'desc'

  const productsPerPage = 6;
  const pagesToShow = 3;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    // Helper function to get the name without the first word
    const getLastName = (str) => str.split(' ').slice(1).join(' ');
  
    if (orderOption === 'name') {
      const nameA = getLastName(a.name);
      const nameB = getLastName(b.name);
  
      return orderDirection === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    } else if (orderOption === 'price') {
      return orderDirection === 'asc'
        ? a.price - b.price
        : b.price - a.price;
    }
  
    return 0;
  });

  const currentProducts = searchTerm
    ? sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : sortedProducts
        .filter((product) =>
          selectedCategories.length === 0
            ? true
            : selectedCategories.includes(product.category)
        )
        .slice(indexOfFirstProduct, indexOfLastProduct);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPage = Math.min(currentPage + pagesToShow - 1, totalPages);

    for (let i = Math.max(1, currentPage - 1); i <= maxPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  
    // Filter products based on the search term
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset current page when search term changes
  };

  const handleOrderChange = (e) => {
    const selectedOrder = e.target.value;
    const [option, direction] = selectedOrder.split('-');
    setOrderOption(option);
    setOrderDirection(direction);
  };

  const handleCategoryFilter = (category) => {
    // Check if the category is already selected
    if (selectedCategories.includes(category)) {
      // Remove the category if already selected
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      // Add the category if not already selected
      setSelectedCategories([...selectedCategories, category]);
    }
  
    setCurrentPage(1); // Reset current page when category filter changes
  };

  return (
  <section class="px-4 py-4 mx-auto max-w-7xl">
      <div class="flex flex-col">
        <div class="h-1 bg-gray-200 rounded overflow-hidden">
          <div class="w-24 h-full bg-indigo-500"></div>
        </div>
        <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
          <h1 class="sm:w-2/5 text-gray-900 text-3xl tracking-tight font-extrabold mb-2 sm:mb-0">Productos</h1>
        </div>
      </div>
      <div class="flex flex-wrap mb-24">
        <div class="w-full lg:w-1/4 lg:block">
          <div class="p-4 mb-5 bg-white border border-gray-200 dark:border-gray-900 dark:bg-gray-900">
            <h2 class="text-2xl font-bold dark:text-gray-400">Categorías</h2>
            <div class="w-16 pb-2 mb-6 border-b border-indigo-600 dark:border-gray-400"></div>
            <ul>
              <li class="mb-4">
                <label for="" class="flex items-center dark:text-gray-400">
                  <input type="checkbox" class="w-4 h-4 mr-2" onChange={() => handleCategoryFilter('campera')}/>
                  <span class="text-lg">Camperas</span>
                </label>
              </li>
              <li class="mb-4">
                <label for="" class="flex items-center dark:text-gray-400">
                  <input type="checkbox" class="w-4 h-4 mr-2" onChange={() => handleCategoryFilter('remera')}/>
                  <span class="text-lg">Remeras</span>
                </label>
              </li>
              <li class="mb-4">
                <label for="" class="flex items-center dark:text-gray-400">
                  <input type="checkbox" class="w-4 h-4 mr-2" onChange={() => handleCategoryFilter('buzo')} />
                  <span class="text-lg">Buzos</span>
                </label>
              </li>
            </ul>
          </div>

          <div class="p-4 mb-5 bg-white border border-gray-200 dark:border-gray-900 dark:bg-gray-900">
            <h2 class="text-2xl font-bold dark:text-gray-400 ">Talle</h2>
            <div class="w-16 pb-2 mb-6 border-b border-indigo-600 dark:border-gray-400"></div>
            <div class="flex flex-wrap -mb-2">
              <button class="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">S</button>
              <button class="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">M</button>
              <button class="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">L</button>
              <button class="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">XL</button>
            </div>
          </div>

          <div class="p-4 mb-5 bg-white border border-gray-200 dark:border-gray-900 dark:bg-gray-900">
            <h2 class="text-2xl font-bold dark:text-gray-400">Colores</h2>
            <div class="w-16 pb-2 mb-6 border-b border-indigo-600 dark:border-gray-400"></div>
            <div class="flex flex-wrap -mx-1 -mb-2">
              <button class="p-1 mb-2 mr-4">
                <div class="w-5 h-5 bg-emerald-400"></div>
              </button>
            </div>
          </div>
        </div>

        <div class="w-full px-0 lg:px-3 lg:w-3/4">
            <form className='mb-2'>   
              <label htmlFor="default-search" class="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input 
                  type="search" 
                  id="default-search" 
                  class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Busca tu producto..."
                  value={searchTerm}
                  onChange={handleSearch}
                  />
              </div>
            </form>
            <div class="items-center justify-between px-4 py-2 mb-4 bg-gray-100 sm:flex dark:bg-gray-900">
              <h2 class="text-2xl dark:text-gray-400">Resultados</h2>
              <div class="flex items-center">
                <label htmlFor="order-select" className="mr-2 text-gray-700 dark:text-gray-400">
                  Ordenar por:
                </label>
                <select
                  id="order-select"
                  value={`${orderOption}-${orderDirection}`}
                  onChange={handleOrderChange}
                  className="sm:pt-0 bg-gray-100 dark:text-gray-400 dark:bg-gray-900"
                >
                  <option value="name-asc">nombre (asc)</option>
                  <option value="name-desc">nombre (desc)</option>
                  <option value="price-asc">precio (asc)</option>
                  <option value="price-desc">precio (desc)</option>
                </select>
              </div>
            </div>
          <div class="flex flex-wrap items-center">
              <ProductListComponent products={currentProducts}/>
          </div>

          <div class="flex justify-end mt-6">
            <nav aria-label="page-navigation">
              <ul class="flex list-style-none">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button onClick={handlePrevPage} className="relative block px-3 py-1.5 mr-3 text-base text-gray-700 transition-all duration-300 rounded-md dark:text-gray-400 hover:text-gray-100 hover:bg-blue-600">
                    Anterior
                  </button>
                </li>
                {generatePageNumbers().map((pageNumber) => (
                  <li key={pageNumber} className="page-item">
                    <button onClick={() => setCurrentPage(pageNumber)} className={`relative block px-3 py-1.5 mr-3 text-base ${currentPage === pageNumber ? 'text-gray-100 bg-blue-600' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-200 dark:hover:text-gray-400 dark:hover:bg-gray-700'} transition-all duration-300 rounded-md`}>
                      {pageNumber}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button onClick={handleNextPage} className="relative block px-3 py-1.5 mr-3 text-base text-gray-700 transition-all duration-300 rounded-md dark:text-gray-400 hover:text-gray-100 hover:bg-blue-600">
                    Siguiente
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
  </section>

  )
}