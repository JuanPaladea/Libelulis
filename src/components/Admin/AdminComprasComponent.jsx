import { useState, useEffect } from "react";
import { collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import LoaderComponent from "../Loader/LoaderComponent";


export default function AdminComprasComponent() {
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 6; // Adjust the page size as needed

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const comprasCollection = collection(db, 'compras');

      try {
        const querySnapshot = await onSnapshot(
          query(comprasCollection, orderBy('timestamp', 'desc')),
          (snapshot) => {
            setCompras(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
            setLoading(false); // Set loading to false once the data is loaded or an error occurs
          }
        );
        return () => {
          // Unsubscribe from the snapshot listener when the component unmounts
          querySnapshot();
        };
      } catch (error) {
        console.error('Error fetching compras:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  // Get the compras for the current page
  const currentCompras = compras.slice(startIndex, endIndex);

  const totalPages = Math.ceil(compras.length / PAGE_SIZE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 z-50">
          <LoaderComponent />
        </div>
      )}

      <section class="bg-white py-12">
        <div class="mx-auto max-w-7xl px-4">
          <div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" class="px-4 py-3">
                      Usuario
                    </th>
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
                  {currentCompras.map((compra) => (
                    <tr key={compra.id} class="border-b hover:cursor-pointer hover:bg-gray-50">
                      <td
                        scope="row"
                        class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <Link to={`/Compra/${compra.id}`} key={compra.id}>
                          {compra.user[1]}{" "}
                        </Link>
                      </td>
                      <td class="px-4 py-3">
                        {compra.items.map((item) => (
                          <Link to={`/Compra/${compra.id}`} key={compra.id}>
                            <p>
                              {item.name} x{item.quantity}
                            </p>
                          </Link>
                        ))}
                      </td>
                      <td class="px-4 py-3">
                        <Link to={`/Compra/${compra.id}`} key={compra.id}>
                          {compra.total.toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Link>
                      </td>
                      <td class="px-4 py-3">
                        <Link to={`/Compra/${compra.id}`} key={compra.id}>
                          {compra.timestamp.toDate().toLocaleString()}
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
                  {startIndex + 1} - {Math.min(endIndex, compras.length)}
                </span>{" "}
                de
                <span class="font-semibold text-gray-900"> {compras.length}</span>
              </span>
              <ul class="inline-flex items-stretch -space-x-px">
                <li>
                  <button
                    onClick={() =>
                      handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                    }
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
        </div>
      </section>
    </div>
  );
}
