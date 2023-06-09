import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const ButtonEditOrDelete = ({ handleFunction, item, isDelete }) => {
  return (
    <button
      type="button"
      className={`right-3 absolute p-1 rounded-full bg-white text-xl cursor-pointer outline-none hover:text-white transition-all duration-500 ease-in-out ${
        isDelete ? "hover:bg-red-700 bottom-3" : "hover:bg-blue-700 top-3"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        handleFunction(item);
      }}
    >
      {isDelete ? <MdDelete /> : <MdEdit />}
    </button>
  );
};

export default ButtonEditOrDelete;
