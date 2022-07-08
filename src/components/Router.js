import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";

import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLogin }) => {
  return (
    <Router>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route exact path="/" element={<Navigation />} />
          </>
        ) : (
          <Route exact path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
