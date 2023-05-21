import { User } from "firebase/auth";
import {
  UserPayloadInter,
  createUserAction,
} from "../../utils/Actions/CreateUserAction";

import { AnyAction } from "redux";
import { UserActionType } from "./user-types";

export const setCurrentUser = (user: User | null): AnyAction => {
  return createUserAction(UserActionType.SET_CURRENT_USER, user);
};

/* export const checkUserSession = () =>
  createUserAction(UserActionType.CHECK_USER_SESSION, null);

export const googleSignInStart = () =>
  createUserAction(UserActionType.GOOGLE_SIGN_IN_START, null);

export const emailSignInStart = (email: string, password: string) =>
  createUserAction(UserActionType.EMAIL_SIGN_IN_START, {
    email,
    password,
  } as UserPayloadInter);

export const signInSuccess = (user: User) =>
  createUserAction(UserActionType.SIGN_IN_SUCCESS, user);

export const signInFailure = (error: Error) =>
  createUserAction(UserActionType.SIGN_IN_FALIURE, error);

export const signUpStart = (
  email: string,
  password: string,
  displayName: string
) =>
  createUserAction(UserActionType.SIGN_UP_START, {
    email,
    password,
    displayName,
  } as UserPayloadInter);

export const signUpSuccess = (user: User) =>
  createUserAction(UserActionType.SIGN_UP_SUCCESS, user);

export const signUpFailure = (error: Error) =>
  createUserAction(UserActionType.SIGN_UP_FAILED, error);

export const signOutStart = () =>
  createUserAction(UserActionType.SIGN_OUT_START, null);

export const signOutSuccess = () =>
  createUserAction(UserActionType.SIGN_OUT_SUCCESS, null);

export const signOutFailure = (error: Error) =>
  createUserAction(UserActionType.SIGN_OUT_FAILED, error);
 */
