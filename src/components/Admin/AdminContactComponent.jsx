import { TrashIcon } from "@heroicons/react/20/solid";
import { collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import LoaderComponent from "../Loader/LoaderComponent";
import { toast } from "react-toastify";
import AdminSingleContactComponent from "./AdminSingleContactComponent";

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
            <ul role="list" className="divide-y divide-gray-100 mx-auto max-w-7xl px-4 mt-8">
            {contacts.map((contact) => (
                <li key={contact.email} className="flex justify-between gap-x-6 py-5 hover:bg-gray-100 hover:cursor-pointer" onClick={() => handleSelectContact(contact)}>
                <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{contact.name} {contact.lastName}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{contact.email}</p>
                    </div>
                </div>
                <div className="flex w-96 min-w-0 gap-x-4">
                    <div className="min-w-0 my-auto flex-auto">
                    <p className="truncate text-xs leading-5 text-gray-500 px-10">{contact.message}</p>
                    </div>
                </div>
                <div className="flex align-center justify-center">
                    <p className="my-auto text-xs leading-5 text-gray-500">
                        <time>{contact.timestamp.toDate().toLocaleString()}</time>
                    </p>
                    <button
                        type="button"
                        className="relative ml-2 -m-2 rounded-md p-2 text-gray-400"
                        onClick={() => removeFromContact(contact.id)}
                    >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close menu</span>
                        <TrashIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                </li>
            ))}
            </ul>
        </div>
    )
}
  