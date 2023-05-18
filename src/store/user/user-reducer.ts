import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { UserActionType } from "./user-types";

type UserContextValue = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

type UserReducerAction = {
  type: UserActionType;
  payload: User | null;
};

const INITAL_STATE: UserContextValue = {
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
};

export const userReducer = (
  state = INITAL_STATE,
  action: UserReducerAction
) => {
  const { type, payload } = action; //Beacuse payload stores value of user
  console.log(action);
  console.log("dispatched");
  switch (type) {
    case "SET_CURRENT_USER":
      return {
        ...state, //Everything after override keep previouse state
        user: payload,
      };
    default:
      return state;
  }
};
