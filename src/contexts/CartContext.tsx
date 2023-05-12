import { ReactNode, createContext, useState } from "react";

interface CartContextInter {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
}

export const CartContext = createContext<CartContextInter>({
  isOpened: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsOpened: () => {},
});

type ChildrenInter = {
  children: ReactNode;
};

export default function CartContextProvider({ children }: ChildrenInter) {
  const [isOpened, setIsOpened] = useState(false);

  const value: CartContextInter = { isOpened, setIsOpened };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
