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

interface FileTableProps {
  files: File[];
  handleHeaderClick: (header: string) => void;
  handleVisualizar: (file: File) => void;
  showDeleteAlert: (id: string) => void;
}

const FileTable: React.FC<FileTableProps> = ({
  files,
  handleHeaderClick,
  handleVisualizar,
  showDeleteAlert,
}) => {
  return (
    <table className="text-xs border border-gray-300 bg-white w-full text-left">
      {/* The rest of the table content */}
      {/* ... */}
    </table>
  );
};

export default FileTable;