import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import LoaderComponent from "../Loader/LoaderComponent";
import AdminSingleContactComponent from "./AdminSingleContactComponent";
import toast from "react-hot-toast";


export default function AdminContactComponent() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 6;
    const MAX_MESSAGE_LENGTH = 100; // Adjust the limit as needed

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const contactsCollection = collection(db, "contacts");

      try {
        const querySnapshot = await getDocs(
          query(contactsCollection, orderBy("timestamp", "desc"))
        );
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast.error("Error fetching contacts: " + error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setOpen(true);
  };

  const removeFromContact = async (contactId) => {
    setLoading(true);
    try {
      const db = getFirestore();
      const contactDocRef = doc(collection(db, "contacts"), contactId);
      await deleteDoc(contactDocRef);
      toast.success("Mensaje eliminado");
    } catch (error) {
      console.error("Error removing contact:", error);
      toast.error("Ha ocurrido un error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  // Get the contacts for the current page
  const currentContacts = contacts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(contacts.length / PAGE_SIZE);

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
      {selectedContact && (
        <AdminSingleContactComponent
          open={open}
          setOpen={setOpen}
          contact={selectedContact}
        />
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
                      Mensaje
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Fecha
                    </th>
                    <th scope="col" class="px-4 py-3">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentContacts.map((contact) => (
                    <tr class="border-b hover:cursor-pointer hover:bg-gray-50" key={contact.id}>
                      <td
                        onClick={() => handleSelectContact(contact)}
                        scope="row"
                        class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {contact.name} {contact.lastName} <br /> {contact.email}
                      </td>
                      <td
                        onClick={() => handleSelectContact(contact)}
                        class="px-4 py-3"
                      >
                        {contact.message.length > MAX_MESSAGE_LENGTH
                          ? `${contact.message.substring(0, MAX_MESSAGE_LENGTH)}...`
                          : contact.message}
                      </td>
                      <td
                        onClick={() => handleSelectContact(contact)}
                        class="px-4 py-3"
                      >
                        {contact.timestamp.toDate().toLocaleString()}
                      </td>
                      <td
                        onClick={() => removeFromContact(contact.id)}
                        class="px-4 py-3 flex items-center justify-end"
                      >
                        <TrashIcon className="h-5 w-5 hover:text-gray-700 my-auto" />
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
              <span class="text-sm font-normal text-gray-500 ">
                Mostrando{" "}
                <span class="font-semibold text-gray-900">
                  {startIndex + 1} - {Math.min(endIndex, contacts.length)}
                </span>{" "}
                de
                <span class="font-semibold text-gray-900"> {contacts.length}</span>
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
