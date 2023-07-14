import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/navbar";
import Whitenav from "../../components/Navbar/Whitenav";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";
import { useRouter } from "next/router";

interface File {
  _id: string;
  nombre: string;
  midios: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Dashboard = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar/ocultar la alerta
  const [selectedFileId, setSelectedFileId] = useState(""); // Estado para almacenar el ID del archivo seleccionado
  const componentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [showMoreRows, setShowMoreRows] = useState(false);
  const maxRowsToShow = 10;
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/files/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {return response.json();} 
        else {throw new Error("Credenciales incorrectas");}
      })
      .then((response) => {
        console.log(response);
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

  const showDeleteAlert = (id: string) => {setSelectedFileId(id);
    setShowAlert(true);
  };

  const cancelDelete = () => {setShowAlert(false)};

  const confirmDelete = () => {setShowAlert(false);
    handleDelete(selectedFileId);
  };
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: "@page { size: landscape; }",
  });

  const contenidodinámico = "CONTENIDO";
  const contenidodinámico2 = "PARA";
  const handleShowMoreRows = () => {setShowMoreRows(true)};

  return (
    <div className="flex h-screen w-screen bg-gray-100 ">
      {navbarVisible && <Navbar />}
      <div className="flex flex-col w-screen  ">
        <Whitenav setNavbarVisible={setNavbarVisible}/>
        <div className="p-5">
            <h2 className="mb-4 ml-3 text-lg">Juego Dioses del Olimpo  </h2>
          <div className="mr-20 bg-white p-5 ">
            <div>
             </div>
            <table className="text-xs border border-gray-300 bg-white w-full text-left">
              <thead>
                <tr className="border border-gray-300">
                  <th className="py-1.5 pl-5  font-medium border border-gray-300">
                    Hora
                  </th>
                  <th className="py-1.5 pl-5  font-medium border border-gray-300">
                    Nombre
                  </th>
                  <th className="py-1.5 pl-5 font-medium border border-gray-300">
                    Dios
                  </th>
                  <th className="py-1.5 text-center font-medium border border-gray-300">
                    Archivo
                  </th>
                  <th className="py-1.5   text-center  font-medium border border-gray-300">
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody>
              {files.slice(0, showMoreRows ? files.length : maxRowsToShow).map((file, index) => (

                   <tr
                    key={file._id}
                    className="border border-gray-300 font-light"
                  >
                    <td className="border border-gray-300 text-[0.65rem] text-left pl-5">
                      {new Date(file.updatedAt).toLocaleTimeString()} -{" "}
                      {new Date(file.updatedAt).toLocaleDateString()}
                    </td>{" "}
                    <td className="border border-gray-300 text-[0.65rem] text-left pl-5">
                      {file.nombre}
                    </td>
                    <td className="border border-gray-300 text-[0.65rem] text-left pl-5">
                      {file.midios}
                    </td>
                    <td className="border border-gray-300 text-center">
                      <button
                        onClick={handlePrint}
                        className="rounded bg-gray-100 shadow px-5 py-1 text-xs text-[0.60rem] hover:bg-gray-50"
                      >
                        Visualizar
                      </button>
                    </td>
                    <td className="border border-gray-300 text-center">
                      <button
                        onClick={() => showDeleteAlert(file._id)}
                        className="rounded bg-gray-100 shadow px-5 py-1 text-xs text-[0.60rem] my-2 hover:bg-gray-50"
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
        <ComponentToPrint
          ref={componentRef}
          nombre={files.length > 0 ? files[0].nombre : ""}
          tuDios={files.length > 0 ? files[0].midios : ""}
          contenidodinámico={contenidodinámico}
          contenidodinámico2={contenidodinámico2}
        />
      </div>
    </div>
  );
};

const ComponentToPrint = React.forwardRef(function ComponentToPrint(
  {
    nombre,
    tuDios,
    contenidodinámico,
    contenidodinámico2,
  }: {
    nombre: string;
    tuDios: string;
    contenidodinámico: any;
    contenidodinámico2: any;
  },
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div ref={ref}>
      <div className="flex flex-col mb-20 text-center justify-center m-20">
        <h1 className="text-3xl mt-20">{nombre}</h1>
        <p className="text-black text-xs">TU DIOS ES</p>
        <div className="flex flex-row" style={{ height: "30", width: "40" }}>
          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <Image
              src="/midiosfoto.png"
              alt="midiosfoto"
              width={120}
              height={120}
            />
          </div>
          <div className="flex flex-col p-5 text-black" style={{ flex: 1 }}>
            <div className="flex flex-col p-2">
              <h2 className="font-bold text-xl">{tuDios}</h2>
              <div className="text-xs">
                <p>{contenidodinámico}</p>
                <p>{contenidodinámico2}</p>
                <p> EL DIOS {tuDios}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ComponentToPrint.displayName = "ComponentToPrint";

export default Dashboard;
