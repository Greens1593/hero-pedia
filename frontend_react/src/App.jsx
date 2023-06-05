import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateHero from "./pages/CreateHero";
import EditHero from "./pages/EditHero";
import { useSelector } from "react-redux";
import Notification from "./components/Notification";

const App = () => {
  const notification = useSelector((state) => state.ui.notification);
  return (
    <div>
      <div className="main">
        <div className="gradient" />
      </div>
      <main className="app">
        <Routes>
          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
              open={notification.open}
            />
          )}
          <Route path="/" element={<Home />} />
          <Route path="create" element={<CreateHero />} />
          <Route path="edit/:id" element={<EditHero />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
