import React from "react";
import { Link } from "react-router-dom";
import Home from "../routes/Home";

const Navigation = () => {
  return (
    <div>
      <span>Home</span>
      <ul>
        <li>
          <Link to="/home">home</Link>
        </li>
        <li>
          <Link to="/profile"> profile</Link>
        </li>
      </ul>
      <Home />
    </div>
  );
};

export default Navigation;