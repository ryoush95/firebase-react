import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { authService, dbService, storageService } from "../myfbase";
import Nweet from "../components/Nweet";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const db = dbService;
  const auth = authService.currentUser;
  const [nwtweet, setNweet] = useState("");
  const [nwtweets, setNweets] = useState([]);
  const [pic, setPic] = useState("");

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
    event.preventDefault();
    let picUrl = "";
    if (pic !== "") {
      const fileRef = ref(storageService, `${auth.uid}/${uuidv4()}`);
      await uploadString(fileRef, pic, "data_url");
      picUrl = await getDownloadURL(ref(storageService, fileRef));
    }

    await addDoc(collection(db, "nweet"), {
      uid: authService.currentUser.uid,
      tweet: nwtweet,
      ts: Timestamp.now(),
      pic: picUrl,
    });
    console.log(nwtweet);

    setNweet("");
    setPic("");
  };

  const onChange = (event) => {
    console.log(event.target.value);
    setNweet(event.target.value);
  };

  const onFile = (e) => {
    const {
      target: { files },
    } = e;
    const selp = files[0];
    const reader = new FileReader();
    reader.onloadend = (finish) => {
      const {
        currentTarget: { result },
      } = finish;
      setPic(result);
    };
    reader.readAsDataURL(selp);
  };

  const onClear = () => setPic(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="new tweet"
          maxLength={110}
          onChange={onChange}
          value={nwtweet}
          required
        />
        <input type="file" accept="image/*" onChange={onFile} />
        <input type="submit" value="nweet" />
        {pic && (
          <div>
            <img src={pic} width="50px" height="50px" />
            <button onClick={onClear}>clear</button>
          </div>
        )}
      </form>
      <br />
      <div style={{ background: "#AAAAAA" }}>
        {nwtweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.uid === auth.uid}
            picUrl={nweet.pic}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;

//파이어베이스 연동하기
