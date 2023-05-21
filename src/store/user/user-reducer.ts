import { User } from "firebase/auth";
import { UserActionType } from "./user-types";

type UserContextValue = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
};

type UserReducerAction = {
  type: UserActionType;
  payload: User;
};

const INITAL_STATE: UserContextValue = {
  user: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = INITAL_STATE,
  action: UserReducerAction
) => {
  const { type, payload } = action; //Beacuse payload stores value of user
  switch (type) {
    case UserActionType.SET_CURRENT_USER:
      return {
        ...state, //Everything after override keep previouse state
        user: payload,
      };
    /*     case UserActionType.SIGN_OUT_SUCCESS:
      return { ...state, user: null };
    case UserActionType.SIGN_OUT_FAILED:
    case UserActionType.SIGN_UP_FAILED:
    case UserActionType.SIGN_IN_FALIURE:
      return {
        ...state,
        error: payload,
      }; */
    default:
      return state;
  }
};
