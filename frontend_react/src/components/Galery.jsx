import React from "react";
import DeleteButton from "./DeleteButton";

const Galery = ({ images, isRedactable, removeImage }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image) => {
        return (
          <div
            key={image.id}
            className="max-w-sm rounded overflow-hidden shadow-lg relative flex flex-center object-cover"
          >
            <img src={image?.url} alt="uploaded-pic" />
            {isRedactable && (
              <DeleteButton item={image} removeFunction={removeImage} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Galery;
