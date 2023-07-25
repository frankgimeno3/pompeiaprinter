import React from "react";

interface File {
    _id: string;
    nombre: string;
    midios: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    lang: string;
  }
interface FileRowProps {
  file: File;
  handleVisualizar: (file: File) => void;
  showDeleteAlert: (id: string) => void;
}

const FileRow: React.FC<FileRowProps> = ({ file, handleVisualizar, showDeleteAlert }) => {
  const { _id, nombre, midios, updatedAt, lang } = file;

  return (
    <tr key={_id} className="border border-gray-300 font-light">
      <td className="border border-gray-300 text-[0.65rem] text-left pl-5">
        {new Date(updatedAt).toLocaleDateString()} - {new Date(updatedAt).toLocaleTimeString()}
      </td>
      <td className="border border-gray-300 text-[0.65rem] text-left pl-5">
        {nombre}
      </td>
      <td className="border border-gray-300 text-[0.65rem] text-left pl-5">
        {midios}
      </td>
      <td className="border border-gray-300 text-[0.65rem] text-left pl-5">
        {lang}
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
          onClick={() => showDeleteAlert(_id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default FileRow;