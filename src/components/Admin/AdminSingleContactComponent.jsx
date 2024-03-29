import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const AdminSingleContactComponent = ({open, setOpen, contact}) => {
    
  return (
    <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="w-full items-center gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                      <div className="sm:col-span-8 lg:col-span-7">
                        <form action="#" method="POST" className="mx-auto max-w-xl">
                              <div className="grid grid-cols-1 gap-x-8 gap-y-6">
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Nombre
                                    </label>
                                    <div className="mt-2.5">
                                    <input
                                        value={contact.name + ' ' + contact.lastName}
                                        disabled
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Email
                                    </label>
                                    <div className="mt-2.5">
                                    <input
                                        value={contact.email}
                                        disabled
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Mensaje
                                    </label>
                                    <div className="mt-2.5">
                                    <textarea
                                        disabled
                                        value={contact.message}
                                        rows={6}
                                        type="text"
                                        name="message"
                                        id="message"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    </div>
                                </div>
                            </div>
                          </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
  )
}

export default AdminSingleContactComponent