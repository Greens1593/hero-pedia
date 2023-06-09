import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../components/Notification";
import { editHero, findHeroById } from "../store/heroActionsSlice";
import { uiActions } from "../store/uiSlice";
import Form from "../components/Form";

const EditHero = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const notification = useSelector((state) => state.ui.notification);
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
    console.log(hero);
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
  }, [dispatch, id]);

  if (!hero) return <h1 className="head_text">Loading...</h1>;
  return (
    <section className="w-full max-w-full flex justify-center">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
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
