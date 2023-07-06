import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

const Navbar: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState("Notificaciones");
  const router = useRouter();

  useEffect(() => {
    const currentPath = router.pathname;
    if (currentPath === "/dashboard") {
      setSelectedButton("Notificaciones");
    } else if (currentPath === "/dashboard/bolsadeempleo" || currentPath === "/dashboard/solicitud" ) {
      setSelectedButton("BolsaDeEmpleo");
    } else if (currentPath === "/dashboard/bolsatrabajadores" || currentPath === "/dashboard/bolsatrabajadores" ) {
      setSelectedButton("Bolsatrabajadores");
    } else if (currentPath === "/dashboard/misofertas") {
      setSelectedButton("MisOfertas");
    } else if (currentPath === "/dashboard/missolicitudes") {
      setSelectedButton("MisSolicitudes");
    } else if (currentPath === "/dashboard/publicaroferta") {
      setSelectedButton("PublicarOferta");
    } else if (currentPath === "/dashboard/procesosactivos") {
      setSelectedButton("ProcesosActivos");
    } else if (currentPath === "/perfil") {
      setSelectedButton("MiPerfil");
    } else if (currentPath === "/perfil2") {
      setSelectedButton("MiPerfil2");
    }
  }, [router.pathname]);

  const handleLogout = async () => {
    Cookies.remove('authvalue');
    try {
      const res = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include", // Para enviar las cookies al servidor
      });
      if (res.status === 200) {
        // Se ha cerrado sesión con éxito
        router.push("/login"); // Redirige al usuario a la página de inicio de sesión
      } else {
        // Manejar el caso de error si no se pudo cerrar sesión
        console.error("No se pudo cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-cyan-950 bg-opacity-60 backdrop-filter backdrop-blur-lg flex items-center justify-between px-4 py-2 md:text-xs xl:text-base">
      <button
        className={`bg-opacity-25 text-white rounded-full py-2 px-3 border-2 hover:bg-white hover:text-cyan-950  hover:cursor-pointer ${
          selectedButton === "Notificaciones" ? "bg-white bg-opacity-50 text-cyan-950" : ""
        }`}
        onClick={() => router.push("/dashboard")}
      >
        HOME
      </button>
      <div>
      <button  style={{fontSize:'0.60rem'}}
          className={`bg-opacity-5 text-white rounded-md mr-1 py-2 px-4 hover:bg-white hover:bg-opacity-50 hover:text-cyan-950  hover:cursor-pointer ${
            selectedButton === "BolsaDeEmpleo" ? "bg-white text-cyan-950 bg-opacity-50" : ""
          }`}
          onClick={() => router.push("/dashboard/bolsadeempleo")}
        >
          OPCION1
        </button>
        <button  style={{fontSize:'0.60rem'}}
          className={`bg-opacity-5 text-white rounded-md mr-1 py-2 px-4 hover:bg-white hover:bg-opacity-50 hover:text-cyan-950  hover:cursor-pointer ${
            selectedButton === "Bolsatrabajadores" ? "bg-white text-cyan-950 bg-opacity-50" : ""
          }`}
          onClick={() => router.push("/dashboard/bolsatrabajadores")}
        >
          OPCION 2
        </button>
         
        <button style={{fontSize:'0.60rem'}}
          onClick={handleLogout}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;