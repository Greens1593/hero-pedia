import React, { useState } from "react";
import Form from "../components/Form";
import { useDispatch } from "react-redux";
import { createHero } from "../store/heroActionsSlice";

const CreateHero = () => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (hero) => {
    setSubmitting(true);
    dispatch(createHero(hero));
  };
  return (
    <section className="w-full max-w-full flex justify-center">
      <Form
        type="Add"
        handleSubmit={handleSubmit}
        submitting={submitting}
        setSubmitting={setSubmitting}
      />
    </section>
  );
};

export default CreateHero;
