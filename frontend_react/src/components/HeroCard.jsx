import React from "react";
import { useNavigate } from "react-router-dom";

const HeroCard = ({ hero }) => {
  const navigate = useNavigate();
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
    </div>
  );
};

export default HeroCard;
