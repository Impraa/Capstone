import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";
import { Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";
import { CategoryInter } from "./categories/categories-reducer";

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

export type RootState = {
  user: {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
  };
  categories: {
    categories: CategoryInter[];
  };
};
