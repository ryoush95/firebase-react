import { getAuth, signOut } from "firebase/auth";
import React from "react";

const Home = () => {
  const auth = getAuth();
  const signout = () => {
    signOut(auth);
  };
  return (
    <div>
      <span>Home</span>
      <button onClick={signout}>logout</button>
    </div>
  );
};
export default Home;
