import React, { useEffect, useState } from "react";
import Notification from "../components/Notification";
import { useSelector } from "react-redux";
import HeroCard from "../components/HeroCard";

const Home = () => {
  const notification = useSelector((state) => state.ui.notification);
  const state = useSelector((state) => state);
  const [heroes, setHeroes] = useState([]);
  useEffect(() => {
    setHeroes(state.heroes);
  }, [state]);
  return (
    <div className="mb-7">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <h1 className="head_text mb-20 green_gradient text-center">
        Your favorite heroes
      </h1>
      <div className="flex justify-center items-center flex-col gap-5">
        {heroes.map((hero) => (
          <HeroCard key={hero._id} hero={hero} />
        ))}
      </div>
    </div>
  );
};

export default Home;
