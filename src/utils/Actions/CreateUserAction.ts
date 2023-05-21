import { User } from "firebase/auth";
import { UserActionType } from "../../store/user/user-types";

export interface UserPayloadInter extends User {
  password: string;
}

export const createUserAction = (
  type: UserActionType,
  payload: User | null | UserPayloadInter | Error
) => ({ type, payload });
