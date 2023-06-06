import React from "react";
import { MdDelete } from "react-icons/md";

const DeleteButton = ({ item, removeFunction }) => {
  return (
    <button
      type="button"
      className="absolute bottom-3 right-3 p-1 rounded-full bg-white text-xl cursor-pointer outline-none hover:bg-red-700 hover:text-white transition-all duration-500 ease-in-out"
      onClick={() => removeFunction(item)}
    >
      <MdDelete />
    </button>
  );
};

export default DeleteButton;
