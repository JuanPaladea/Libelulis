import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

const UsuarioComponent = () => {
  const {user} = useUser()
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const db = getFirestore()

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
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
        console.log(purchases)
        setPurchaseHistory(purchases);
      } catch (error) {
        console.error('Error fetching user purchase history:', error);
      }
    };

    if (user) {
      fetchPurchaseHistory();
    }
  }, [user]);

  const calculateTotalItems = (items) => {
    return items.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  return (
    <div className='max-w-screen-xl p-4 px-4 mx-auto bg-white sm:px-6 lg:px-8 py-26 lg:mt-5'>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Información del Usuario</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Detalles</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nombre Completo</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.displayName}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Historial de compra</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                {purchaseHistory.map((compra) => (
                  <li key={compra.id} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">Compra {compra.id}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="truncate font-medium">Total items: {calculateTotalItems(compra.data.items)}</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {<span className="truncate font-medium">{compra.data.total.toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default UsuarioComponent