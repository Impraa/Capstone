import { User } from "firebase/auth";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useReducer,
} from "react";
import {
  createUser,
  onAuthStateChangedListner,
} from "../utils/Firebase/firebase";

type UserContextValue = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const UserContext = React.createContext<UserContextValue>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

enum UserActionType {
  SET_CURRENT_USER = "SET_CURRENT_USER",
}

type UserReducerAction = {
  type: UserActionType;
  payload: User | null;
};

const userReducer = (state: UserContextValue, action: UserReducerAction) => {
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
      throw new Error(`Undhandled type ${type} in userReducer`);
  }
};

const INITAL_STATE: UserContextValue = {
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
};

export const UserProvider = ({ children }: UserProviderProps) => {
  //const [user, setUser] = React.useState<User | null>(null);

  const [{ user, setUser }, dispatch] = useReducer(userReducer, INITAL_STATE);

  console.log(user);

  const setCurrentUser = (user: User | null) => {
    dispatch({ type: UserActionType.SET_CURRENT_USER, payload: user });
  };

  const value: UserContextValue = React.useMemo(
    () => ({ user, setUser }),
    [user]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
      if (user) {
        createUser(user, {});
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/*

const userReducer = (state,action) =>{
  return{
    currentUser:
  }
}

*/
