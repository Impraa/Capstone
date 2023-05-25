import { Route, Routes } from "react-router-dom";
import "./App.css";

import { Suspense, lazy, useEffect } from "react";
import {
  createUser,
  onAuthStateChangedListner,
} from "./utils/Firebase/firebase";
import { setCurrentUser } from "./store/user/user-action";
import { useDispatch } from "react-redux";
import Spinner from "./components/Spinner/Spinner";

const Home = lazy(() => import("./pages/Home/Home"));
const Authentication = lazy(
  () => import("./pages/Authentication/Authentication")
);
const Navigation = lazy(() => import("./pages/Navigation/Navigation"));
const Shop = lazy(() => import("./pages/Shop/Shop"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));

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
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
