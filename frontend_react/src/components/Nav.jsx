import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex justify-between w-full mb-16 pt-3">
      <Link to="/">
        <h1 className="logo_text">
          <span className="blue_gradient">Hero</span>
          <span className="green_gradient">Pedia</span>
        </h1>
      </Link>
      <Link className="black_btn" to="/create">
        Create hero
      </Link>
    </nav>
  );
};

export default Nav;
