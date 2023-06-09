import React, { useEffect, useState } from "react";
import Notification from "../components/Notification";
import { useSelector } from "react-redux";
import HeroCard from "../components/HeroCard";

const Home = () => {
  const notification = useSelector((state) => state.ui.notification);
  const state = useSelector((state) => state);
  const [heroes, setHeroes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const heroesPerPage = 2; // Number of heroes to display per page

  useEffect(() => {
    setHeroes(state.heroes);
  }, [state]);

  // Logic to calculate current heroes for the current page
  const indexOfLastHero = currentPage * heroesPerPage;
  const indexOfFirstHero = indexOfLastHero - heroesPerPage;
  const currentHeroes = heroes.slice(indexOfFirstHero, indexOfLastHero);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mb-7">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <h1 className="head_text mb-20 green_gradient text-center">
        Your favorite heroes
      </h1>
      <div className="flex justify-center items-center flex-col gap-5 mb-7">
        {currentHeroes.map((hero) => (
          <HeroCard key={hero._id} hero={hero} />
        ))}
      </div>
      <ul className="flex justify-center gap-2">
        {Array(Math.ceil(heroes.length / heroesPerPage))
          .fill()
          .map((_, index) => (
            <li key={index}>
              <button
                className={`px-3 py-2 rounded-md transition-colors ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
