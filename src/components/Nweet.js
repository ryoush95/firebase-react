import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../myfbase";

const Nweet = ({ nweetObj, isOwner }) => {
  const db = dbService;
  const [editing, setEditing] = useState(false);
  const [newNweet, setNweet] = useState(nweetObj.tweet);
  const onDelete = async () => {
    const ok = window.confirm("delete?");
    if (ok) {
      console.log(nweetObj.id);
      await deleteDoc(doc(db, "nweet", nweetObj.id));
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    updateDoc(doc(db, "nweet", nweetObj.id), {
      tweet: newNweet,
    });
    setEditing(false);
  };
  const onToggle = () => {
    setEditing((v) => !v);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" value={newNweet} onChange={onChange} required />
            <input type="submit" />
          </form>
          <button onClick={onToggle}>cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.tweet}</h4>
          {isOwner ? (
            <>
              <button onClick={onToggle}>update</button>
              <button onClick={onDelete}>delete</button>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Nweet;
