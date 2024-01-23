import { addDoc, collection, getFirestore } from "firebase/firestore"
import { useState } from "react"
import LoaderComponent from "../Loader/LoaderComponent"
import toast from "react-hot-toast"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ContactFormComponent() {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [characterCount, setCharacterCount] = useState(0);
  const maxMessageLength = 250;
  const db = getFirestore();

  const handleTextareaChange = (e) => {
    const inputMessage = e.target.value;
    setCharacterCount(inputMessage.length);
    setMessage(inputMessage.slice(0, maxMessageLength));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        addDoc(collection(db, 'contacts'), { 
          name,
          lastName,
          email,
          message,
          timestamp: new Date() }),
        {
          loading: 'Enviando mensaje...',
          success: <b>Mensaje enviado</b>,
          error: <b>Ha ocurrido un error</b>,
        }
      );
      setName('');
      setLastName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error(error);
      // Handle the error or show an error message to the user
      toast.error('Error al enviar el mensaje');
    }
  };

  return (
    <div>
      <div>
      </div>
      <div className="isolate bg-white px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Formulario de contacto</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Completa nuestro formulario para contactarte con nosotros
          </p>
        </div>
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                Nombre
              </label>
              <div className="mt-2.5">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                Apellido
              </label>
              <div className="mt-2.5">
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Mensaje <span className="text-gray-500">({characterCount}/{maxMessageLength})</span>
              </label>
              <div className="mt-2.5">
                <textarea
                  value={message}
                  onChange={handleTextareaChange}
                  name="message"
                  id="message"
                  rows={4}
                  maxLength={maxMessageLength}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              onClick={handleSubmit}
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Contáctanos
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
