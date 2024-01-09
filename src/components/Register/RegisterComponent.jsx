import { useState } from 'react';
import LoginWithGoogleComponent from '../LoginWithGoogle/LoginWithGoogleComponent'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext';

export default function Example() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password2Error, setPassword2Error] = useState('');

  const {createUser} = useUser()

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (password2 && e.target.value !== password2) {
      setPassword2Error('Las contraseñas no coinciden');
    } else {
      setPassword2Error('');
    }
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
    if (password && e.target.value !== password) {
      setPassword2Error('Las contraseñas no coinciden');
    } else {
      setPassword2Error('');
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setEmailError('El correo electrónico es requerido');
    } else if (!emailRegex.test(email)) {
      setEmailError('Ingrese un correo electrónico válido');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!password.trim()) {
      setPasswordError('La contraseña es requerida');
    } else if (!passwordRegex.test(password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número');
    } else {
      setPasswordError('');
    }
  };

  const validatePassword2 = () => {
    if (password2 !== password) {
      setPassword2Error('Las contraseñas no coinciden');
    } else {
      setPassword2Error('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();
    validatePassword2();

    // Check if there are no validation errors before calling createUser
    if (!emailError && !passwordError && !password2Error) {
      createUser(email, password);
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="https://i.imgur.com/0twzt2t.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Regístrate en nuestra página
          </h2>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-4xl lg:px-8">
        <LoginWithGoogleComponent/>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-4xl lg:px-8">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Apellido
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setLastName(e.target.value)}                  
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>
              </div>
              <div className="sm:col-span-4" >
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Contraseña
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      onChange={handlePasswordChange}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                  </div>
                </div>
              <div className="sm:col-span-4" >
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Repita su contraseña
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      onChange={handlePassword2Change}
                      id="password2"
                      name="password2"
                      type="password"
                      required
                      className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${password2 !== password && 'ring-red-300 focus:ring-red-600'}`}
                    />
                    <p className="text-red-500 text-sm mt-1">{password2Error}</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-start gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Registrarse
          </button>
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
              ¿Ya estás registrado?{' '}
              <Link to="/Iniciar-Sesion" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Inicia Sesión
              </Link>
            </p>
    </div>
  )
}
