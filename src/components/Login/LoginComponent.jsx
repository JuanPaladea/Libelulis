import { Link } from "react-router-dom";
import LoginWithGoogleComponent from "../LoginWithGoogle/LoginWithGoogleComponent";
import { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {loginUser} = useUser()

  return (
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-24 mx-auto">
        <img
          className="mx-auto h-20 w-auto"
          src="https://i.imgur.com/0twzt2t.png"
          alt="Libelulis"
        />
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Inicia sesión en tu cuenta
                </h1>
                <form class="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ejemplo@gmail.com" required=""/>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    <div class="flex items-center justify-between">
                        <Link to="/ContraseñaOlvidada" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sing in</button>
                      <LoginWithGoogleComponent/>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        ¿No estás registrado? <Link to="/Registrarse" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Regístrate</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}
  