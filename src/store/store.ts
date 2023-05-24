import { compose, createStore, applyMiddleware, Middleware } from "redux";
import logger from "redux-logger";

import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import thunk from "redux-thunk";
import createSagaMiddlware from "redux-saga";

import { rootReducer } from "./root-reducer";
import { Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";
import { CategoryInter, ProductInter } from "./categories/categories-reducer";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddlware();

const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  thunk,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

/* type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[],
} */

const persistConfig/* : ExtendedPersistConfig */ = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
/* 
const composeEnhancer =
  (process.env.NODE_ENV === "development" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose; */

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = {
  user: {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
  };
  categories: {
    categories: CategoryInter[];
    isLoading: boolean;
  };
  cart: {
    isOpened: boolean;
    cartItems: ProductInter[];
    cartCount: number;
    cartTotal: number;
  };
};

// export type RootState = ReturnType<typeof rootReducer>