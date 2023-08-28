import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";

interface WhitenavProps {
  setNavbarVisible: (visible: boolean) => void;
}

const Whitenav: React.FC<WhitenavProps> = ({ setNavbarVisible }) => {
  const router = useRouter();
  const [navbarVisible, setNavbarVisibleState] = useState(true);

  const handleToggleNavbar = () => {
    if(navbarVisible){
        setNavbarVisible(false)
        setNavbarVisibleState(false)
    }
    else{
        setNavbarVisible(true)
        setNavbarVisibleState(true)
    }
};

  const handleLogout = async () => {
    Cookies.remove("authvalue");
    try {
      const res = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",  
      });
      if (res.status === 200) {
         router.push("/login"); // Redirige al usuario a la página de inicio de sesión
      } else {
         console.error("No se pudo cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
    router.push("/");
  };

  return (
    <nav className="flex flex-row bg-white justify-between px-2 py-1 shadow">
      <div className="px-2 py-1">
        <button className="pt-2" onClick={handleToggleNavbar}>
          <Image src="/menuicon.png" alt="menuicon" width={20} height={20} />
        </button>
      </div>
      <div className="px-2 py-1">
        <button
          style={{ fontSize: "0.60rem" }}
          onClick={handleLogout}
          className="bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Whitenav;