import { User } from "firebase/auth";

enum UserActionType {
  SET_CURRENT_USER = "SET_CURRENT_USER",
}

type UserReducerAction = {
  type: UserActionType;
  payload: User | null;
};

export const createUserAction = (
  type: UserActionType,
  payload: User | null
) => ({ type, payload });
