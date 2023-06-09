import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../components/Form";
import { createHero } from "../store/heroActionsSlice";
import { useNavigate } from "react-router-dom";

const CreateHero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [hero, setHero] = useState({
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
    try {
      dispatch(createHero(formData));
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-full flex justify-center">
      <Form
        type="Add"
        handleSubmit={handleSubmit}
        submitting={submitting}
        hero={hero}
        setHero={setHero}
      />
    </section>
  );
};

export default CreateHero;
