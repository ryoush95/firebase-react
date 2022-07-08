import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../myfbase";

const Home = () => {
  const [nwtweet, setNweet] = useState("");
  // const [nwtweets, setNweets] = useState([]);
  const onSubmit = async (event) => {
    event.preventDefault();
    const docs = await addDoc(collection(dbService, "nweet"), {
      name: "",
      tweet: nwtweet,
      ts: Timestamp.now(),
    });
    console.log(docs.id);
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
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" onSubmit={onSubmit} />
      </form>
    </div>
  );
};
export default Home;

//파이어베이스 연동하기
