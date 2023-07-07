import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/navbar";
import Link from 'next/link';
import { useRouter } from "next/router";

interface File {
  _id: string;
  content: string;
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
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Credenciales incorrectas");
      }
    })
    .then(response => {
      console.log(response);
      setFiles(response);
    })
    .catch(error => {
      console.error("Ha ocurrido un error:", error);
    });
  }, []);

  const handleprint = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("esto te tendría que visualizar el PDF")
  }
  
  const handledelete = (id: string) => {
    fetch(`http://localhost:5000/files/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
    .then(response => {
      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error("Error al eliminar el archivo");
      }
    })
    .catch(error => {
      console.error("Ha ocurrido un error:", error);
    });
  }

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
    <>
      <Navbar />
      <div className="mx-20 pl-10 mb-5 ">
        <h1 className="mt-20 text-2xl">Contenido a imprimir</h1>
        <div className="mr-20 ">
          {files.map((file, index) => (
            <div className="flex my-2 flex-row justify-between bg-white align-center pt-1" key={file._id}>
              <p className="flex mr-20 pl-10 pt-1 mb-5 align-center">{file.content}</p>
              <div className="my-2 flex-row " key={file._id}>
                <button
                  className="rounded bg-gray-100 shadow px-5 py-1 mr-5 text-xs hover:bg-gray-50"
                  onClick={handleprint}
                >Visualizar</button>
                <button
                  className="rounded bg-gray-100 shadow px-5 py-1 mr-5 text-xs hover:bg-gray-50"
                  onClick={() => showDeleteAlert(file._id)}
                >Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showAlert && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75">
          <div className="bg-white p-5 rounded shadow">
            <p className="text-xl mb-5">¿Estás seguro que deseas eliminar?</p>
            <div className="flex justify-end">
              <button className="rounded bg-red-500 text-white px-4 py-2 mr-2" onClick={confirmDelete}>ELIMINAR</button>
              <button className="rounded bg-gray-200 px-4 py-2" onClick={cancelDelete}>CANCELAR</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Impresion;