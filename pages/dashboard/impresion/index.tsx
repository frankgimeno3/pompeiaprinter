import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/navbar";
import Link from 'next/link';

interface File {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Impresion = () => {
  const [files, setFiles] = useState<File[]>([]);

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
  
  const handledelete = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("esto te tendría que visualizar el PDF")
  }


  return (
    <>
      <Navbar />
      <div className="mx-20 pl-10 mb-5 ">

      <h1 className="mt-20 text-2xl">Contenido a imprimir</h1>
      <div className="mr-20 ">
        {files.map((file, index) => (
            <div className="flex my-2 flex-row justify-between bg-white align-center pt-1" key={index}>
                <p className="flex mr-20 pl-10 pt-1 mb-5 align-center">{file.content}</p>
                    <div className="my-2 flex-row " key={index}>
                        <button 
                        className="rounded bg-gray-100 shadow px-5 py-1 mr-5 text-xs hover:bg-gray-50"
                        onClick={handleprint}
                        >Visualizar</button>
                        <button 
                        className="rounded bg-gray-100 shadow px-5 py-1 mr-5 text-xs hover:bg-gray-50"
                        onClick={handledelete}
                        >Eliminar</button>
                    </div>
            </div>
            ))}
      </div>
      </div>
    </>
  );
};

export default Impresion;