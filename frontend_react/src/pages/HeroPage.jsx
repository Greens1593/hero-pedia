import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteHero, findHeroById } from "../store/heroActionsSlice";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { uiActions } from "../store/uiSlice";
import Galery from "../components/Galery";
import ButtonEditOrDelete from "../components/ButtonEditOrDelete";

const HeroPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [hero, setHero] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    images: [],
  });

  const navigate = useNavigate();
  const removeHero = (id) => {
    dispatch(deleteHero(id));
    navigate("/");
  };
  const editHero = (id) => {
    navigate(`/edit/${id}`);
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
    <section className="container w-5/6 rounded-md bg-slate-100 p-10 shadow-md flex flex-col justify-center items-center gap-5 mb-4 relative">
      <h1 className="head_text blue_gradient">{hero.nickname}</h1>
      <div className="flex justify-center overflow-hidden rounded-sm bg-slate-200 w-1/3">
        <img
          src={hero?.images[0]}
          alt={hero.nickname}
          className="w-full h-full object-cover"
        />
      </div>
      <ul className="w-1/2 flex flex-col gap-3 mb-4">
        <li className="flex justify-between w-full items-center">
          <span className="font-medium text-[#666e75] text-xl">Real Name:</span>
          <p className="font-semibold">{hero.real_name}</p>
        </li>
        <li className="flex justify-between w-full items-center">
          <span className="font-medium text-[#666e75] text-xl">
            Origin Description:
          </span>
          <p className="font-semibold">{hero.origin_description}</p>
        </li>
        <li className="flex justify-between w-full items-center">
          <span className="font-medium text-[#666e75] text-xl">
            Superpowers:
          </span>
          <p className="font-semibold">{hero.superpowers}</p>
        </li>
        <li className="flex justify-between w-full items-center">
          <span className="font-medium text-[#666e75] text-xl">
            Catch Phrase:
          </span>
          <p className="font-semibold">{hero.catch_phrase}</p>
        </li>
      </ul>
      <h3 className="font-medium text-black text-xl">{hero.nickname} images</h3>
      <Galery images={hero.images} isRedactable={false} />
      <ButtonEditOrDelete
        item={hero._id}
        isDelete={false}
        handleFunction={editHero}
      />
      <ButtonEditOrDelete
        item={hero._id}
        handleFunction={removeHero}
        isDelete={true}
      />
    </section>
  );
};

export default HeroPage;
