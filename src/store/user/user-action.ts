import { User } from "firebase/auth";
import { createUserAction } from "../../utils/Actions/CreateUserAction";
import { UserActionType } from "./user-types";
import { AnyAction } from "redux";

export const setCurrentUser = (user: User | null): AnyAction => {
  return createUserAction(UserActionType.SET_CURRENT_USER, user);
};
