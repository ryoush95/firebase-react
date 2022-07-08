import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  const history = useNavigate();
  const onSignout = () => {
    signOut(auth);
    history("/");
  };
  return (
    <>
      <button onClick={onSignout}>logout</button>
    </>
  );
};

export default Profile;
