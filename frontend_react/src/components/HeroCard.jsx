import React from "react";
import ButtonEditOrDelete from "./ButtonEditOrDelete";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteHero } from "../store/heroActionsSlice";

const HeroCard = ({ hero }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const removeHero = (id) => {
    dispatch(deleteHero(id));
  };
  const editHero = (id) => {
    navigate(`/edit/${id}`);
  };
  return (
    <div onClick={(e) => navigate(`/${hero._id}`)} className="hero_card">
      <div className="flex justify-center overflow-hidden rounded-md w-1/3">
        <img
          src={hero.images[0]}
          alt="uploaded-pic"
          className="w-full object-cover"
        />
      </div>
      <div className="w-2/3 flex justify-center items-center">
        <h2 className="text-xl font-bold blue_gradient">{hero.nickname}</h2>
      </div>
      <ButtonEditOrDelete
        item={hero._id}
        handleFunction={editHero}
        isDelete={false}
      />
      <ButtonEditOrDelete
        item={hero._id}
        handleFunction={removeHero}
        isDelete={true}
      />
    </div>
  );
};

export default HeroCard;
