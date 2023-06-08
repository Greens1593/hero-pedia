import React from "react";
import ButtonEditOrDelete from "./ButtonEditOrDelete";

const Galery = ({ images, isRedactable, removeImage }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image) => {
        return (
          <div
            key={image.lastModified}
            className="max-w-sm rounded overflow-hidden shadow-lg relative flex flex-center object-cover"
          >
            <img src={URL.createObjectURL(image)} alt="uploaded-pic" />
            {isRedactable && (
              <ButtonEditOrDelete
                item={image}
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
