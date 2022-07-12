import AppRouter from "./Router";
import { authService } from "../myfbase";
import { useEffect, useState } from "react";

function App() {
  const auth = authService;
  const [init, setInit] = useState(false);
  const [isLogin, setLogin] = useState(auth.currentUser);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
      setInit(true);
    });
  }, []);

  return <>{init ? <AppRouter isLogin={isLogin} /> : "loading"}</>;
}

export default App;
