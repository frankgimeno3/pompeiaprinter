import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState("Notificaciones");
  const router = useRouter();

  useEffect(() => {
    const currentPath = router.pathname;
    if (currentPath === "/dashboard") {
      setSelectedButton("HOME");
    } else if (
      currentPath === "/dashboard/impresion" ||
      currentPath === "/dashboard/impresion"
    ) {
      setSelectedButton("impresion");
    } else if (
      currentPath === "/dashboard/opcion2" ||
      currentPath === "/dashboard/opcion2"
    ) {
      setSelectedButton("opcion2");
    }
  }, [router.pathname]);

  

  return (
    <nav className="flex flex-col bg-slate-800 h-full items-start text-start py-2 md:text-xs xl:text-base">
      <h2
        className="flex flex-wrap bg-opacity-25 text-white py-1 pr-8 pl-4 mr-5 text-md mt-3 font-semibold  "
       >
        Tótem interactivo MAD
      </h2>
          <h2 className="text-gray-400 text-xs pl-6 mt-7">Impresión de recuerdos</h2>
          <div className="flex flex-row text-white text-xs    mt-2 bg-gray-50 w-full justify-left bg-opacity-30">
            <button className="bg-white pl-1"></button>
            <button className="flex text-white text-xs  pl-8 py-2   bg-gray-50 w-full justify-left bg-opacity-30">Dioses del Olimpo</button>
          </div>

     </nav>
  );
};

export default Navbar;
