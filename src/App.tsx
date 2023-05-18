import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Navigation from "./pages/Navigation/Navigation";
import Authentication from "./pages/Authentication/Authentication";
import Shop from "./pages/Shop/Shop";
import Checkout from "./pages/Checkout/Checkout";
import { useEffect } from "react";
import {
  createUser,
  onAuthStateChangedListner,
} from "./utils/Firebase/firebase";
import { setCurrentUser } from "./store/user/user-action";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
      if (user) {
        createUser(user, {});
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
