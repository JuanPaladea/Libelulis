import { collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoaderComponent from "../Loader/LoaderComponent";

export default function AdminComprasComponent() {
    const [compras, setCompras] = useState([])
    const [loading, setLoading] = useState(true)     

    useEffect(() => {
        const db = getFirestore();
        const comprasCollection = collection(db, 'compras');
        
        const unsubscribe = onSnapshot(query(comprasCollection, orderBy('timestamp', 'desc')), (snapshot) => {
            setCompras(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })));
            setLoading(false); // Set loading to false once the data is loaded or an error occurs
        });
        return () => {
            // Unsubscribe from the snapshot listener when the component unmounts
            unsubscribe();
        };
        }, []);

    return (
        <div>
            {
            loading
            &&
            (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 z-50">
                <LoaderComponent/>
                </div>
            )
            }
            <section class="bg-gray-50 dark:bg-gray-900 py-12">
                <div class="mx-auto max-w-7xl px-4">
                    <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-4 py-3">Usuario</th>
                                        <th scope="col" class="px-4 py-3">Items</th>
                                        <th scope="col" class="px-4 py-3">Precio</th>
                                        <th scope="col" class="px-4 py-3">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {compras.map((compra) => (
                                    <tr key={compra.id} class="border-b dark:border-gray-700 hover:cursor-pointer">
                                        <td scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"><Link to={`/Compra/${compra.id}`} key={compra.id}>{compra.user[1]} </Link></td>
                                        <td class="px-4 py-3">{compra.items.map((item) => (
                                            <Link to={`/Compra/${compra.id}`} key={compra.id}>
                                                <p>{item.name} x{item.quantity}</p>
                                            </Link>
                                        ))} </td>
                                        <td class="px-4 py-3"><Link to={`/Compra/${compra.id}`} key={compra.id}>
                                            {compra.total.toLocaleString('es-AR', {
                                                style: 'currency',
                                                currency: 'ARS',
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </Link></td>
                                        <td class="px-4 py-3"><Link to={`/Compra/${compra.id}`} key={compra.id}>{compra.timestamp.toDate().toLocaleString()}</Link></td>
                                    </tr>
                                ))} 
                                </tbody>
                            </table>
                        </div>
                        <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing
                                <span class="font-semibold text-gray-900 dark:text-white"> 1-10 </span>
                                of
                                <span class="font-semibold text-gray-900 dark:text-white"> 1000</span>
                            </span>
                            <ul class="inline-flex items-stretch -space-x-px">
                                <li>
                                    <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span class="sr-only">Previous</span>
                                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span class="sr-only">Next</span>
                                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </div>
    )
}
  