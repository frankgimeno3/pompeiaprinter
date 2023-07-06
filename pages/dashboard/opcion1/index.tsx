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

const Opcion1 = () => {
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

  return (
    <>
      <Navbar />
      <div className="mx-20 pl-10 mb-5 ">

      <h1 className="mt-20 text-2xl">Check Opcion1</h1>
      <div className="mr-20 ">
        {files.map((file, index) => (
            <div className="flex my-2 flex-row justify-between bg-white align-center" key={index}>
                <p className="mr-20 pl-10 py-1mb-5 ">{file.content}</p>
                    <div className="my-2 flex-row " key={index}>
                        <button className="rounded bg-gray-100 shadow px-5 py-1 mr-5 text-xs hover:bg-gray-50">Borrar</button>
                        <button className="rounded bg-gray-100 shadow px-5 py-1 mr-5 text-xs hover:bg-gray-50">Eliminar</button>
                    </div>
            </div>
            ))}
      </div>
      </div>
    </>
  );
};

export default Opcion1;