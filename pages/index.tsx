import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

const Home = () => {

const [usuario, setusuario] = useState("");
const [password, setPassword] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const router = useRouter();


const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);
  const cookieOptions = {expires: expirationDate, secure: true
  };
  fetch("https://pompeiabackend-ntha9xyjc-frankgimeno3.vercel.app/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usuario, password }),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Credenciales incorrectas");
      }
    })
    .then(response => {
 
      console.log(response.authToken);

      Cookies.set('authvalue', response.authToken, cookieOptions);  
      router.push("/dashboard");
    })
    .catch(error => {
      console.error("Ha ocurrido un error:", error);
     });
  };

  return (
    <div className="relative w-full h-screen bg-black">
      
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
      <div className=" backdrop-filter backdrop-blur-lg w-50vw pt-10 pb-10 ">
        <div className="flex flex-col items-center p-24">
          <h2 className="text-4xl text-white pb-10">Iniciar Sesión</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <h2 className="text-white text-xl">Usuario</h2>
              <input
                className="w-full px-4 py-2 border rounded-md"
                type="usuario"
                value={usuario}
                onChange={(e) => setusuario(e.target.value)}
              />
            </div>

            <div className="mb-6">
            <h2 className="text-white text-xl" >Contraseña</h2>

              <input
                className="w-full px-4 py-2 border rounded-md"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && <p>{errorMessage}</p>}
            </div>

            <button
              className="mt-8 bg-white text-gray-800 rounded-full py-2 px-4 border-b-2 border-gray-500 hover:bg-gray-600 hover:text-white"
              onClick={handleLogin}
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Home;