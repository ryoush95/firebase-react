import { signOut, updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../myfbase";

const Profile = () => {
  const auth = authService;
  const history = useNavigate();
  const [newName, setNewName] = useState(auth.currentUser.displayName);
  const onSignout = () => {
    signOut(auth);
    history("/");
  };

  const getMyNweet = async () => {
    const q = query(
      collection(dbService, "nweet"),
      where("uid", "==", auth.currentUser.uid),
      orderBy("ts", "desc")
    );

    const docs = getDocs(q);
    console.log(docs);
  };

  useEffect(() => {
    getMyNweet();
  }, []);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (auth.currentUser.uid !== newName) {
      updateProfile(auth.currentUser, {
        displayName: newName,
      });
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={newName} required />
        <input type="submit" />
      </form>
      <button onClick={onSignout}>logout</button>
    </>
  );
};

export default Profile;
