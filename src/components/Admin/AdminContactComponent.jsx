import { TrashIcon } from "@heroicons/react/20/solid";
import { collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import LoaderComponent from "../Loader/LoaderComponent";
import AdminSingleContactComponent from "./AdminSingleContactComponent";
import toast from "react-hot-toast";

export default function AdminContactComponent() {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        const db = getFirestore();
        const contactsCollection = collection(db, 'contacts');
    
        // Use onSnapshot to listen for real-time updates
        const unsubscribe = onSnapshot(query(contactsCollection, orderBy('timestamp', 'desc')), (snapshot) => {
            setContacts(
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
    }, []); // Empty dependency array means this effect runs once, similar to componentDidMount    
    
    const handleSelectContact = (contact) => {
        setSelectedContact(contact)
        setOpen(true)
    }

    const removeFromContact = async (contactId) => {
        setLoading(true)
        try {
        const db = getFirestore();
        const contactDocRef = doc(collection(db, 'contacts'), contactId);
        await deleteDoc(contactDocRef);
        toast.success('Mensaje eliminado')
        } catch (error) {
            console.error('Error removing contact:', error);
            toast.error('Ha ocurrido un error: ' + error.message)
        } finally {
            setLoading(false)
        }
    };

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
            {selectedContact && (
                <AdminSingleContactComponent open={open} setOpen={setOpen} contact={selectedContact} />
            )}
            <section class="bg-gray-50 dark:bg-gray-900 py-12">
                <div class="mx-auto max-w-7xl px-4">
                    <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-4 py-3">Usuario</th>
                                        <th scope="col" class="px-4 py-3">Mensaje</th>
                                        <th scope="col" class="px-4 py-3">Fecha</th>
                                        <th scope="col" class="px-4 py-3">
                                            <span class="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {contacts.map((contact) => (
                                    <tr class="border-b dark:border-gray-700 hover:cursor-pointer">
                                        <td onClick={() => handleSelectContact(contact)} scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{contact.name} {contact.lastName} <br/> {contact.email}</td>
                                        <td onClick={() => handleSelectContact(contact)} class="px-4 py-3">{contact.message}</td>
                                        <td onClick={() => handleSelectContact(contact)} class="px-4 py-3">{contact.timestamp.toDate().toLocaleString()}</td>
                                        <td onClick={() => removeFromContact(contact.id)} class="px-4 py-3 flex items-center justify-end">
                                            <TrashIcon className="h-5 w-5 hover:text-gray-700 my-auto"/>
                                        </td>
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
  