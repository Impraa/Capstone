import { User } from "firebase/auth";
import React, { ReactNode, useEffect } from "react";
import {
  createUser,
  onAuthStateChangedListner,
} from "../utils/Firebase/firebase";

type UserContextValue = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = React.createContext<UserContextValue>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);

  const value: UserContextValue = React.useMemo(
    () => ({ user, setUser }),
    [user]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
      if (user) {
        createUser(user, {});
      }
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
