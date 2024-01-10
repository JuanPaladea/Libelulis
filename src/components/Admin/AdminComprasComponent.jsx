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
            <ul role="list" className="divide-y divide-gray-100 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
            {compras.map((compra) => (
                <Link to={`/Compra/${compra.id}`} key={compra.id} className="flex justify-between gap-x-6 py-5 hover:bg-gray-100 rounded px-4">
                <div className="flex min-w-0 gap-x-4 my-auto">
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={compra.items[0].img} alt="" />
                    <div className="min-w-0 my-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900 my-auto">{compra.user[1]}</p>
                    </div>
                </div>
                <div className="flex min-w-0 gap-x-4 my-auto">
                    <div className="min-w-0 my-auto flex-auto">
                    <p className="truncate text-xs leading-5 text-gray-500 my-auto">{compra.total.toLocaleString('es-AR', {
                                style: 'currency',
                                currency: 'ARS',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}</p>
                    </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="my-auto text-xs leading-5 text-gray-500">
                        <time>{compra.timestamp.toDate().toLocaleString()}</time>
                    </p>
                </div>
                </Link>
            ))}
            </ul>
        </div>
    )
}
  