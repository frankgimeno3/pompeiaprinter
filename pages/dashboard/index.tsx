/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/navbar";
import Whitenav from "../../components/Navbar/Whitenav";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";
import { useRouter } from "next/router";
import Contenido from "../../lib/slogans.json";
import Contenidoeng from "../../lib/sloganseng.json";

interface File {
  _id: string;
  nombre: string;
  midios: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lang: string;
}

const Dashboard = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState("");
  const componentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [showMoreRows, setShowMoreRows] = useState(false);
  const maxRowsToShow = 10;
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [contenidoprint, setcontenidoprint] = useState("");
  const [currentOrder, setCurrentOrder] = useState<string>("");
  const [selectedRowData, setSelectedRowData] = useState<File | null>(null);
   useEffect(() => {
    fetch("http://localhost:5000/files/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Credenciales incorrectas");
        }
      })
      .then((response) => {
         setFiles(response);
      })
      .catch((error) => {
        console.error("Ha ocurrido un error:", error);
      });
  }, []);

  const handleDelete = (id: string) => {
    fetch(`http://localhost:5000/files/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          throw new Error("Error al eliminar el archivo");
        }
      })
      .catch((error) => {
        console.error("Ha ocurrido un error:", error);
      });
  };

  const showDeleteAlert = (id: string) => {
    setSelectedFileId(id);
    setShowAlert(true);
  };

  const cancelDelete = () => {
    setShowAlert(false);
  };

  const confirmDelete = () => {
    setShowAlert(false);
    handleDelete(selectedFileId);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: "@page { size: landscape; }",
  });

  const handleShowMoreRows = () => {
    setShowMoreRows(true);
  };

  const handleHeaderClick = (header: string) => {
    const newOrder = header === currentOrder ? `-${header}` : header;
    const sortedTableData = files.slice().sort((a, b) => {
      if (header === "updatedAt") {
        return (
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
      } else {
        return (a as any)[header].localeCompare((b as any)[header]);
      }
    });

    if (newOrder.startsWith("-")) {
      sortedTableData.reverse();
    }

    setFiles(sortedTableData);
    setCurrentOrder(newOrder);
  };

  const handleVisualizar = (file: File) => {
    setSelectedRowData(file);
    function selectedgod (file: File) {
      if(file.lang == "en"){
        if(file.midios == "CERES")setcontenidoprint(Contenidoeng.CERES)
        if(file.midios == "DIANA")setcontenidoprint(Contenidoeng.DIANA)
        if(file.midios == "PHOEBUS")setcontenidoprint(Contenidoeng.PHOEBUS)
        if(file.midios == "JUPITER")setcontenidoprint(Contenidoeng.JUPITER)
        if(file.midios == "JUNO")setcontenidoprint(Contenidoeng.JUNO)
        if(file.midios == "MARS")setcontenidoprint(Contenidoeng.MARS)
        if(file.midios == "MERCURY")setcontenidoprint(Contenidoeng.MERCURY)
        if(file.midios == "MINERVA")setcontenidoprint(Contenidoeng.MINERVA)
        if(file.midios == "NEPTUNE")setcontenidoprint(Contenidoeng.NEPTUNE)
        if(file.midios == "VENUS")setcontenidoprint(Contenidoeng.VENUS)
        if(file.midios == "VESTA")setcontenidoprint(Contenidoeng.VESTA)
        if(file.midios == "VULCAN")setcontenidoprint(Contenidoeng.VULCAN)
      } else {
        if(file.midios == "CERES")setcontenidoprint(Contenido.CERES)
        if(file.midios == "DIANA")setcontenidoprint(Contenido.DIANA)
        if(file.midios == "FEBO")setcontenidoprint(Contenido.FEBO)
        if(file.midios == "JUPITER")setcontenidoprint(Contenido.JUPITER)
        if(file.midios == "JUNO")setcontenidoprint(Contenido.JUNO)
        if(file.midios == "MARTE")setcontenidoprint(Contenido.MARTE)
        if(file.midios == "MERCURIO")setcontenidoprint(Contenido.MERCURIO)
        if(file.midios == "MINERVA")setcontenidoprint(Contenido.MINERVA)
        if(file.midios == "NEPTUNO")setcontenidoprint(Contenido.NEPTUNO)
        if(file.midios == "VENUS")setcontenidoprint(Contenido.VENUS)
        if(file.midios == "VESTA")setcontenidoprint(Contenido.VESTA)
        if(file.midios == "VULCANO")setcontenidoprint(Contenido.VULCANO)
      }
      }
      selectedgod(file)
      setTimeout(function() {
        handlePrint();
      }, 500);  };

  return (
    <div className="flex min-h-screen w-screen bg-gray-100 ">
      {navbarVisible && <Navbar />}
      <div className="flex flex-col w-screen  ">
        <Whitenav setNavbarVisible={setNavbarVisible} />
        <div className="p-5">
          <h2 className="mb-4 ml-3 text-lg">Juego Dioses del Olimpo </h2>
          <div className="mr-20 bg-white p-5 ">
            <table className="text-xs border border-gray-300 bg-white w-full text-left">
              <thead>
                <tr className="border border-gray-300">
                  <th
                    className="py-1.5 pl-5 font-medium border border-gray-300 cursor-pointer"
                    onClick={() => handleHeaderClick("updatedAt")}
                  >
                    Hora
                  </th>
                  <th
                    className="py-1.5 pl-5 font-medium border border-gray-300 cursor-pointer"
                    onClick={() => handleHeaderClick("nombre")}
                  >
                    Nombre
                  </th>
                  <th
                    className="py-1.5 pl-5 font-medium border border-gray-300 cursor-pointer"
                    onClick={() => handleHeaderClick("midios")}
                  >
                    Dios
                  </th>
                  <th
                    className="py-1.5 pl-5 font-medium border border-gray-300 cursor-pointer"
                    onClick={() => handleHeaderClick("lang")}
                  >
                    Idioma
                  </th>
                  <th className="py-1.5 text-center font-medium border border-gray-300">
                    Archivo
                  </th>
                  <th className="py-1.5 text-center font-medium border border-gray-300">
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file._id} className="border border-gray-300 font-light">
                    <td className="border border-gray-300 text-[0.65rem] text-left pl-5">
                      {new Date(file.updatedAt).toLocaleDateString()} -{" "}
                      {new Date(file.updatedAt).toLocaleTimeString()}
                    </td>
                    <td className="border border-gray-300 text-[0.65rem] text-left pl-5">
                      {file.nombre}
                    </td>
                    <td className="border border-gray-300 text-[0.65rem] text-left pl-5">
                      {file.midios}
                    </td>
                    <td className="border border-gray-300 text-[0.65rem] text-left pl-5">
                      {file.lang}
                    </td>
                    <td className="border border-gray-300 text-center">
                      <button
                        className="rounded bg-gray-100 shadow px-5 py-1 text-xs text-[0.60rem] hover:bg-gray-50 btn-visualizar"
                        onClick={() => handleVisualizar(file)}  
                      >
                        Visualizar
                      </button>
                    </td>
                    <td className="border border-gray-300 text-center">
                      <button
                        className="rounded bg-gray-100 shadow px-5 py-1 text-xs text-[0.60rem] my-2 hover:bg-gray-50 btn-eliminar"
                        onClick={() => showDeleteAlert(file._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {files.length > maxRowsToShow && !showMoreRows && (
              <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600"
                  onClick={handleShowMoreRows}
                >
                  Ver más filas
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showAlert && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75">
          <div className="bg-white p-5 rounded shadow">
            <p className="text-xl mb-5">¿Estás seguro que deseas eliminar?</p>
            <div className="flex justify-end">
              <button
                className="rounded bg-red-500 text-white px-4 py-2 mr-2"
                onClick={confirmDelete}
              >
                ELIMINAR
              </button>
              <button
                className="rounded bg-gray-200 px-4 py-2"
                onClick={cancelDelete}
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}
      <div style={{ display: "none" }}>
         {selectedRowData && (
          <ComponentToPrint
            ref={componentRef}
            nombre={selectedRowData.nombre}
            tuDios={selectedRowData.midios}
            tulang={selectedRowData.lang}
            contenidoprint={contenidoprint} 
          />
        )}
      </div>
    </div>
  );
};

const ComponentToPrint = React.forwardRef(function ComponentToPrint(
  {
    nombre,
    tuDios,
    tulang,
    contenidoprint
 
  }: {
    nombre: string;
    tuDios: string;
    tulang:string;
    contenidoprint: string;
 
    },
  ref: React.Ref<HTMLDivElement>
) {
  let tudioses = "TU DIOS ES"
   const imagendios = `/${tulang}/${tuDios}.png`;
  if(tulang= "en"){
    tudioses = "YOUR GOD IS"
   }
  else {
    tudioses = "TU DIOS ES"
   }
  return (
    <div
      ref={ref}
      className="h-screen flex justify-center text-center relative cinzel-font"
    >
       <div
        className="absolute top-0 left-0 w-full h-full z-0 "
        style={{ opacity: 0.3 }}
      >
        <img
          src="/fondo1.png"
          alt="Fondo"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
       <div className="z-10 mt-24 pt-24">
        <div className="flex flex-row text-center justify-center align-center  px-24 mx-14">
          <div className="flex-1 flex items-center justify-center pl-5">
            <Image src={imagendios} alt={tuDios} width={200} height={200} />
          </div>

          <div className="flex-1 flex flex-col  align-center ">
            <h1 className="text-6xl mt-10 ">{nombre}</h1>
            <p className="text-black text-lg mt-5   text-black">{tudioses}</p>
            <h2 className="  text-4xl  mb-5   ">{tuDios}</h2>
            <div className="text-black">
              <div className="text-lg mb-10 px-10">{contenidoprint}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ComponentToPrint.displayName = "ComponentToPrint";

export default Dashboard;