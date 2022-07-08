import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../myfbase";

const Auth = () => {
  const auth = authService;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [sc, setSc] = useState(false);
  const sc = false;
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (sc) {
      await auth
        .createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setError(error.message);
        });
    } else {
      await auth
        .signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          <Link to="/home" />;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setError(error.message);
        });
    }
  };
  const snslogin = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    await signInWithPopup(auth, provider);
  };
  return (
    <div>
      <h1>login</h1>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <input type="submit" value={sc ? "create" : "login"} />
      </form>
      {error}
      <button onClick={snslogin} name={"google"}>
        google
      </button>
    </div>
  );
};
export default Auth;
