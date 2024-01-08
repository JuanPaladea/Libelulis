import { collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function AdminComprasComponent() {
const [contacts, setContacts] = useState([])
const [selectedContact, setSelectedContact] = useState(null);

useEffect(() => {
    const db = getFirestore();
    const contactsCollection = collection(db, 'contacts');
    
    const unsubscribe = onSnapshot(query(contactsCollection, orderBy('timestamp', 'desc')), (snapshot) => {
        setContacts(
        snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })));
    });
    return () => {
        // Unsubscribe from the snapshot listener when the component unmounts
        unsubscribe();
    };
    }, []);

return (
    <ul role="list" className="divide-y divide-gray-100 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
    {contacts.map((contact) => (
        <li key={contact.email} className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">{contact.name} {contact.lastName}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{contact.email}</p>
            </div>
        </div>
        <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 my-auto flex-auto">
            <p className="truncate text-xs leading-5 text-gray-500">{contact.message}</p>
            </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="my-auto text-xs leading-5 text-gray-500">
                <time>{contact.timestamp.toDate().toLocaleString()}</time>
            </p>
        </div>
        </li>
    ))}
    </ul>
)
}
  