import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { authService, dbService } from "../myfbase";

const Home = () => {
  const db = dbService;
  const [nwtweet, setNweet] = useState("");
  const [nwtweets, setNweets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "nweet"), orderBy("ts", "desc"));
    onSnapshot(
      q,
      (doc) => {
        // doc.docChanges().forEach((change) => {
        //   console.log(change.doc.data());
        // });
        const array = doc.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setNweets(array);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

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
      <br />
      <div style={{ background: "#AAAAAA" }}>
        {nwtweets.map((nweet) => (
          <div key={nweet.id}>
            <span>{nweet.uid}</span>
            <h4>{nweet.tweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;

//파이어베이스 연동하기
