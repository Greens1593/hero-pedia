import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Galery from "./Galery";

const Form = ({ type, handleSubmit, submitting, hero, setHero }) => {
  const navigate = useNavigate();
  const [wrongImageType, setWrongImageType] = useState(false);
  const uploadImage = (e) => {
    const file = e.target.files[0];
    const allowedImageTypes = ["image/jpeg", "image/png"];
    if (file) {
      if (allowedImageTypes.includes(file.type)) {
        setWrongImageType(false);
        setHero({ ...hero, images: [...hero.images, file] });
      } else {
        setWrongImageType(true);
      }
    }
  };
  const removeImage = (img) => {
    setHero({
      ...hero,
      images: hero.images.filter(
        (image) => image.lastModified !== img.lastModified
      ),
    });
  };

  return (
    <section className="w-full max-w-full flex-start flex-col flex items-center">
      <h1 className="head_text text-center">
        <span className="blue_gradient">
          {type} information about your favorite hero
        </span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Hero nickname
          </span>
          <input
            value={hero.nickname}
            onChange={(e) => setHero({ ...hero, nickname: e.target.value })}
            placeholder="Write hero nickname here"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Hero real name
          </span>
          <input
            value={hero.real_name}
            onChange={(e) => setHero({ ...hero, real_name: e.target.value })}
            placeholder="Write hero real name here"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Hero origin description
          </span>
          <textarea
            value={hero.origin_description}
            onChange={(e) =>
              setHero({ ...hero, origin_description: e.target.value })
            }
            placeholder="Write about who is your hero and where he or she is from"
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            What is your hero's superpowers?
          </span>
          <textarea
            value={hero.superpowers}
            onChange={(e) => setHero({ ...hero, superpowers: e.target.value })}
            placeholder="Write about superpowers of your hero"
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Hero catch phrase
          </span>
          <input
            value={hero.catch_phrase}
            onChange={(e) => setHero({ ...hero, catch_phrase: e.target.value })}
            placeholder="Write catch phrase of your hero"
            required
            className="form_input"
          />
        </label>
        {hero.images.length > 0 && (
          <Galery
            images={hero.images}
            removeImage={removeImage}
            isRedactable={true}
          />
        )}
        {wrongImageType && <p>Wrong image type</p>}
        <label className="cursor-pointer">
          <div className="flex flex-col items-center justify-center h-full rounded-md bg-slate-50 py-4 shadow-md">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="font-bold text-3xl">
                <AiOutlineCloudUpload />
              </p>
              <p className="text-4xl">Click to upload your hero image</p>
            </div>
            <p className="mt-10 text-gray-400">
              Use hight-quality JPG or PNG les than 20MB
            </p>
          </div>
          <input
            type="file"
            name="upload-image"
            onChange={uploadImage}
            className="w-0 h-0"
          />
        </label>
        <div className="flex-end flex items-center justify-between mx-3 mb-5 gap-4">
          <p
            onClick={() => navigate("/")}
            className="text-gray-500 text-sm cursor-pointer"
          >
            Cancel
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange text-white rounded-3xl"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
