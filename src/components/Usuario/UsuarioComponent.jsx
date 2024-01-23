import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import LoaderComponent from '../Loader/LoaderComponent';

const UsuarioComponent = () => {
  const {user} = useUser()
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const db = getFirestore();
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        setLoading(true)
        // Create a query to get user's purchase history
        const compraCollectionRef = collection(db, 'compras');
        const userUid = user.uid;
        const userComprasQuery = query(compraCollectionRef, where('user', 'array-contains', userUid));
        const userComprasSnapshot = await getDocs(userComprasQuery);

        // Extract data from each document
        const purchases = userComprasSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setPurchaseHistory(purchases);
      } catch (error) {
        console.error('Error fetching user purchase history:', error);
      } finally {
        setLoading(false)
      }
    };

    if (user) {
      fetchPurchaseHistory();
    }
  }, [user]);

  const totalPages = Math.ceil(purchaseHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, purchaseHistory.length);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='max-w-7xl px-4 mx-auto bg-white mt-12'>
      <div class="flex flex-col">
        <div class="h-1 bg-gray-200 rounded overflow-hidden">
          <div class="w-24 h-full bg-indigo-500"></div>
        </div>
        <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
          <h1 class="sm:w-2/5 text-gray-900 text-3xl tracking-tight font-extrabold mb-2 sm:mb-0">Usuario</h1>
        </div>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nombre Completo</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.displayName}</dd>
          </div>
          <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
          </div>
          <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium leading-6 text-gray-900">Historial de compra</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
                <div class="overflow-x-auto">
                  <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th scope="col" class="px-4 py-3">
                          Items
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Precio
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading 
                      ?
                      <div className='p-6 w-full h-full flex items-center justify-center'><LoaderComponent/></div>
                      :
                      purchaseHistory.slice(startIndex, endIndex).map((compra) => (
                        <tr key={compra.id} class="border-b hover:cursor-pointer hover:bg-gray-50">
                          <td class="px-4 py-3">
                            {compra.data.items.map((item) => (
                              <Link to={`/Compra/${compra.id}`} key={compra.id}>
                                <p>
                                  {item.name} x{item.quantity}
                                </p>
                              </Link>
                            ))}
                          </td>
                          <td class="px-4 py-3">
                            <Link to={`/Compra/${compra.id}`} key={compra.id}>
                              {compra.data.total.toLocaleString('es-AR', {
                                style: 'currency',
                                currency: 'ARS',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </Link>
                          </td>
                          <td class="px-4 py-3">
                            <Link to={`/Compra/${compra.id}`} key={compra.id}>
                              {compra.data.timestamp.toDate().toLocaleString()}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav
                  class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                  aria-label="Table navigation"
                  >
                  <span class="text-sm font-normal text-gray-500">
                    Mostrando{" "}
                    <span class="font-semibold text-gray-900">
                      {startIndex + 1} - {Math.min(endIndex, purchaseHistory.length)}
                    </span>{" "}
                    de
                    <span class="font-semibold text-gray-900"> {purchaseHistory.length}</span>
                  </span>
                  <ul class="inline-flex items-stretch -space-x-px">
                    <li>
                      <button
                        onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                        disabled={currentPage === 1}
                        class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                      >
                        <span class="sr-only">Previous</span>
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                    {[...Array(totalPages).keys()].map((page) => (
                      <li key={page}>
                        <button
                          onClick={() => handlePageChange(page + 1)}
                          class={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                            currentPage === page + 1
                              ? "text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700"
                              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                          }`}
                        >
                          {page + 1}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={() =>
                          handlePageChange(
                            currentPage < totalPages ? currentPage + 1 : totalPages
                          )
                        }
                        disabled={currentPage === totalPages}
                        class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                      >
                        <span class="sr-only">Next</span>
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default UsuarioComponent