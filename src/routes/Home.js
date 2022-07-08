import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { authService, dbService } from "../myfbase";

const Home = () => {
  const db = dbService;
  const [nwtweet, setNweet] = useState("");
  // const [nwtweets, setNweets] = useState([]);
  const onSubmit = async (event) => {
    console.log(event.preventDefault());
    try {
      const docs = await addDoc(collection(db, "nweet"), {
        uid: authService.currentUser.uid,
        tweet: nwtweet,
        ts: Timestamp.now(),
      });
      console.log(docs.id);
    } catch (e) {
      console.log(e);
    }
  };
  const onChange = (event) => {
    console.log(event.target.value);
    setNweet(event.target.value);
  };
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="new tweet"
          maxLength={10}
          onChange={onChange}
        />
        <input type="submit" onClick={onSubmit} />
      </form>
    </div>
  );
};
export default Home;

//파이어베이스 연동하기
