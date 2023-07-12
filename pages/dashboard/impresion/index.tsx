import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/navbar";
import Link from "next/link";
import { useRouter } from "next/router";

interface File {
  _id: string;
  nombre: string;
  midios: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Impresion = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar/ocultar la alerta
  const [selectedFileId, setSelectedFileId] = useState(""); // Estado para almacenar el ID del archivo seleccionado
  const router = useRouter();

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
        console.log(response);
        setFiles(response);
      })
      .catch((error) => {
        console.error("Ha ocurrido un error:", error);
      });
  }, []);

  const handleprint = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("esto te tendría que visualizar el PDF");
  };

  const handledelete = (id: string) => {
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
    handledelete(selectedFileId);
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="p-10   ">
        <h1 className="  text-xl  font-light">Contenido a imprimir</h1>
        <div className="mr-20 mt-5 ">
          
          <table className="text-xs  border border-gray-300 bg-white">
            <thead>
              <tr className="border border-gray-300  ">
                <th className="py-1.5 px-10 font-medium border border-gray-300">Id</th>
                <th className="py-1.5 px-10 font-medium border border-gray-300">Fecha</th>
                <th className="py-1.5 px-10 font-medium border border-gray-300">Nombre</th>
                <th className="py-1.5 px-10 font-medium border border-gray-300">Archivo</th>
                <th className="py-1.5 px-10 font-medium border border-gray-300">Opciones</th>
              </tr>
            </thead>
            <tbody >
              {files.map((file, index) => (
                <tr key={file._id} className="border border-gray-300  font-light">
                  <td className="border border-gray-300 text-[0.65rem] pl-3">{file._id}</td>
                  <td className="border border-gray-300 text-[0.65rem] pl-3">{file.updatedAt}</td>
                  <td className="border border-gray-300 text-[0.65rem] pl-3">{file.nombre}</td>
                  <td className="border border-gray-300 text-center ">
                    <button
                      onClick={handleprint}
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
        </div>
      </div>
      {showAlert && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75">
          <div className="bg-white p-5 rounded shadow">
            <p className="text-xl mb-5">¿Estás seguro que deseas eliminar?</p>
            <div className="flex justify-end">
              <button
                className="rounded bg-red-500 text-white px-4 py-2 mr-2 "
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
    </div>
  );
};



export default Impresion;
