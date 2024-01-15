import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { useState } from 'react'
import { toast } from 'react-toastify'
import LoaderComponent from '../Loader/LoaderComponent'
import { motion } from 'framer-motion'

export default function NewsletterComponent() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false);

  const db = getFirestore()

  const isValidEmail = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidEmail(email)) {
      subscribeToNewsletter(email);
    } else {
      toast.error('Por favor, introduce un correo electrónico válido');
    }
  }

  const subscribeToNewsletter = async (email) => {
    try {
      setLoading(true); // Set loading to true before performing the asynchronous operation

      await addDoc(collection(db, 'subscribers'), { email });

      setEmail(''); // Clear the email after successful subscription
      toast.success('Suscripto correctamente');
    } catch (error) {
      console.error(error);
      toast.error('Ha ocurrido un error al suscribirse');
    } finally {
      setLoading(false); // Set loading to false after the asynchronous operation completes
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
      <div className="relative isolate overflow-hidden bg-gray-200 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Suscríbete a nuestro Newsletter.</h2>
              <p className="mt-4 text-lg leading-8">
                Obtendrás las últimas actualizaciones de nuestro catálogo.
              </p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  required
                  className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Introduce tu mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSubmit}
                  className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Suscribete
                </motion.button>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:pt-2">
              <div className="flex flex-col items-start justify-center">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <CalendarDaysIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold">Artículos semanales</dt>
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <HandRaisedIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold">No spam</dt>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
