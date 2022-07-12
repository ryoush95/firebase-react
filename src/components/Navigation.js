import React from "react";
import { Link } from "react-router-dom";
import { authService } from "../myfbase";

const Navigation = () => {
  const auth = authService.currentUser;
  return (
    <div>
      <span>Home</span>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/profile">{auth.displayName}'s profile</Link>
        </li>
      </ul>
      <br />
    </div>
  );
};

export default Navigation;
