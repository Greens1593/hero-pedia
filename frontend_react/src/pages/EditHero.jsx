import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editHero, findHeroById } from "../store/heroActionsSlice";
import { uiActions } from "../store/uiSlice";
import Form from "../components/Form";

const EditHero = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [hero, setHero] = useState({
    _id: "",
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    images: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nickname", hero.nickname);
    formData.append("real_name", hero.real_name);
    formData.append("origin_description", hero.origin_description);
    formData.append("superpowers", hero.superpowers);
    formData.append("catch_phrase", hero.catch_phrase);
    hero.images.forEach((file, index) => {
      formData.append(`image_${index + 1}`, file);
    });
    setSubmitting(true);
    const reqData = {
      hero: formData,
      id: hero._id,
    };

    try {
      dispatch(editHero(reqData));
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const heroData = await dispatch(findHeroById(id));
        setHero(heroData);
        const imageFiles = await Promise.all(
          heroData.images.map(async (imageUrl) => {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], "image.jpg", { type: blob.type });
            return file;
          })
        );
        setHero((prevHero) => ({ ...prevHero, images: imageFiles }));
      } catch (err) {
        dispatch(
          uiActions.showNotification({
            open: true,
            message: "Request Failed",
            type: "error",
          })
        );
      }
    };

    fetchHeroData();
  }, []);
  if (
    hero.images.length === 0 &&
    hero.nickname === "" &&
    hero.real_name === "" &&
    hero.origin_description === "" &&
    hero.superpowers === "" &&
    hero.catch_phrase === ""
  )
    return <h1 className="head_text">Loading...</h1>;
  return (
    <section className="w-full max-w-full flex justify-center">
      <Form
        type="Edit"
        handleSubmit={handleSubmit}
        submitting={submitting}
        hero={hero}
        setHero={setHero}
      />
    </section>
  );
};

export default EditHero;
