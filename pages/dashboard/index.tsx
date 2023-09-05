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
    fetch("https://pompeiabackend-ntha9xyjc-frankgimeno3.vercel.app/files/", {
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
    fetch(
      `https://pompeiabackend-ntha9xyjc-frankgimeno3.vercel.app/files/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    )
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
    switch (file.lang) {
      case "es":
        switch (file.midios) {
          case "CERES":
            setcontenidoprint(Contenido.CERES);
            break;
          case "DIANA":
            setcontenidoprint(Contenido.DIANA);
            break;
          case "FEBO":
            setcontenidoprint(Contenido.FEBO);
            break;
          case "JUPITER":
            setcontenidoprint(Contenido.JUPITER);
            break;
          case "PLUTÓN":
            setcontenidoprint(Contenido.PLUTÓN);
            break;
          case "MARTE":
            setcontenidoprint(Contenido.MARTE);
            break;
          case "MERCURIO":
            setcontenidoprint(Contenido.MERCURIO);
            break;
          case "MINERVA":
            setcontenidoprint(Contenido.MINERVA);
            break;
          case "NEPTUNO":
            setcontenidoprint(Contenido.NEPTUNO);
            break;
          case "VENUS":
            setcontenidoprint(Contenido.VENUS);
            break;
          case "BACO":
            setcontenidoprint(Contenido.BACO);
            break;
          case "VULCANO":
            setcontenidoprint(Contenido.VULCANO);
            break;
          default:
            break;
        }
        break;
      case "en":
        switch (file.midios) {
          case "CERES":
            setcontenidoprint(Contenidoeng.CERES);
            break;
          case "DIANA":
            setcontenidoprint(Contenidoeng.DIANA);
            break;
          case "PHOEBUS":
            setcontenidoprint(Contenidoeng.PHOEBUS);
            break;
          case "JUPITER":
            setcontenidoprint(Contenidoeng.JUPITER);
            break;
          case "BACCHUS":
            setcontenidoprint(Contenidoeng.BACCHUS);
            break;
          case "MARS":
            setcontenidoprint(Contenidoeng.MARS);
            break;
          case "MERCURY":
            setcontenidoprint(Contenidoeng.MERCURY);
            break;
          case "MINERVA":
            setcontenidoprint(Contenidoeng.MINERVA);
            break;
          case "NEPTUNE":
            setcontenidoprint(Contenidoeng.NEPTUNE);
            break;
          case "VENUS":
            setcontenidoprint(Contenidoeng.VENUS);
            break;
          case "PLUTO":
            setcontenidoprint(Contenidoeng.PLUTO);
            break;
          case "VULCAN":
            setcontenidoprint(Contenidoeng.VULCAN);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }

    setTimeout(function () {
      handlePrint();
    }, 500);
  };

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
                  <tr
                    key={file._id}
                    className="border border-gray-300 font-light "
                  >
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
    contenidoprint,
  }: {
    nombre: string;
    tuDios: string;
    tulang: string;
    contenidoprint: string;
  },
  ref: React.Ref<HTMLDivElement>
) {
  const imagendios = `/${tulang}s/${tuDios}.png`;
  let tudioses = "TU DIOS ES";
  switch (tulang) {
    case "en":
      tudioses = "YOUR GOD IS";
      break;
    default:
      tudioses = "TU DIOS ES";
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel&display=swap');
          /* Agrega otros estilos personalizados aquí, si es necesario */
        `}
      </style>
      <div
        ref={ref}
        className="h-screen flex justify-center text-center relative cinzel-font text-yellow-900 text-opacity-50 font-light"
      >
        <div className="flex flex-row text-left justify-center align-center  px-20 pr-24 mx-14"   style={{ zIndex: 1 }}>
          <div className="flex-1 flex flex-col  pl-14 ml-12 py-24 pr-2 justify-left ">
            <h1 className="text-5xl  pt-24 ">{nombre}</h1>
            <p className="text-black text-2xl mt-2 mb-8   text-black">
              {tudioses}
            </p>
            <h2 className="text-black  text-5xl  mb-5   ">{tuDios}</h2>
            <div className="text-black">
              <div className="text-xl mb-10 pr-5">{contenidoprint}</div>
            </div>
          </div>
          <div className="flex-2 flex items-center justify-center   ">
            <img
              src={imagendios}
              alt={tuDios}
              width={400}
              height={400}
               className=" pt-14 mr-10"
            />
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full z-0">
          <img
            src="/f2.png"
            alt="f2"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </>
  );
});

ComponentToPrint.displayName = "ComponentToPrint";

export default Dashboard;
