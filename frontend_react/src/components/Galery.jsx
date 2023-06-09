import React from "react";
import ButtonEditOrDelete from "./ButtonEditOrDelete";

const Galery = ({ images, isRedactable, removeImage }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((item) => {
        return (
          <div
            key={item.lastModified || item}
            className="max-w-sm rounded overflow-hidden shadow-lg relative flex flex-center object-cover"
          >
            <img
              src={typeof item === "string" ? item : URL.createObjectURL(item)}
              alt="hero"
            />
            {isRedactable && (
              <ButtonEditOrDelete
                item={item}
                handleFunction={removeImage}
                isDelete={true}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Galery;
