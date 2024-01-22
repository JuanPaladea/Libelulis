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

  const handleRegister = (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();
    validatePassword2();

    // Check if there are no validation errors before calling createUser
    if (!emailError && !passwordError && !password2Error) {
      createUser(email, password);
    }
    setPassword('')
    setPassword2('')
    setEmail('')

  };

  return (
    <section class="bg-gray-50">
      <div class="flex flex-col items-center justify-center px-5 mx-auto py-24">
          <img
            className="mx-auto h-20 w-auto"
            src="https://i.imgur.com/0twzt2t.png"
            alt="Libelulis"
          />
          <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                      Crea una cuenta
                  </h1>
                  <form class="space-y-4 md:space-y-6" action="#">
                      <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="ejemplo@gmail.com" required=""/>
                          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                          <input value={password} onChange={handlePasswordChange} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                      </div>
                      <div>
                          <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900">Confirma tu contraseña</label>
                          <input value={password2} onChange={handlePassword2Change} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                          <p className="text-red-500 text-sm mt-1">{password2Error}</p>
                      </div>
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="terms" class="font-light text-gray-500">Acepto los <a class="font-medium text-primary-600 hover:underline">Términos y condiciones</a></label>
                          </div>
                      </div>
                      <button onClick={(e) => handleRegister(e)} class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Crea una cuenta</button>
                      <LoginWithGoogleComponent/>
                      <p class="text-sm font-light text-gray-500">
                          ¿Ya tienes una cuenta? <Link to="/Iniciar-Sesion" class="font-medium text-primary-600 hover:underline">Inicia sesión</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  )
}
