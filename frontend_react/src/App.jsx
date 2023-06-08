import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateHero from "./pages/CreateHero";
import EditHero from "./pages/EditHero";
import Nav from "./components/Nav";
import { useDispatch } from "react-redux";
import { fetchData } from "./store/heroActionsSlice";
import HeroPage from "./pages/HeroPage";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  return (
    <div>
      <div className="main">
        <div className="gradient" />
      </div>
      <main className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<HeroPage />} />
          <Route path="create" element={<CreateHero />} />
          <Route path="edit/:id" element={<EditHero />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
