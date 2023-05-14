import { ReactNode, createContext, useEffect, useState } from "react";
import { ProductInter } from "./ProductContext";

interface CartContextInter {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  cartItems?: ProductInter[];
  addItemToCart: (cartItem: ProductInter) => void;
  cartCount: number;
  removeItemFromCart: (cartItem: ProductInter) => void;
  clearItemFromCart: (cartItem: ProductInter) => void;
  cartTotal: number;
}

export const CartContext = createContext<CartContextInter>({
  isOpened: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsOpened: () => {},
  cartItems: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addItemToCart: (cartItem: ProductInter) => {},
  cartCount: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeItemFromCart: (cartItem: ProductInter) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearItemFromCart: (cartItem: ProductInter) => {},
  cartTotal: 0,
});

type ChildrenInter = {
  children: ReactNode;
};

const addCartItem = (cartItems: ProductInter[], cartItem: ProductInter) => {
  const existingCartItem = cartItems.find((item: ProductInter) => {
    return cartItem.id === item.id;
  });

  if (existingCartItem) {
    return cartItems.map((item: ProductInter) => {
      if (item.id === cartItem.id && item.quantity !== undefined) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
  }

  return [...cartItems, { ...cartItem, quantity: 1 }];
};

const removeCartItem = (cartItems: ProductInter[], cartItem: ProductInter) => {
  const existingCartItem = cartItems.find((item: ProductInter) => {
    return cartItem.id === item.id;
  });

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItem.id);
  }

  return cartItems.map((item: ProductInter) => {
    if (item.id === cartItem.id && item.quantity !== undefined) {
      return { ...item, quantity: item.quantity - 1 };
    } else {
      return item;
    }
  });
};

const clearCartItem = (cartItems: ProductInter[], cartItem: ProductInter) => {
  return cartItems.filter((item) => item.id !== cartItem.id);
};

export default function CartContextProvider({ children }: ChildrenInter) {
  const [isOpened, setIsOpened] = useState(false);
  const [cartItems, setCartItems] = useState<ProductInter[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) =>
        cartItem.quantity !== undefined ? total + cartItem.quantity : 0,
      0
    );
    setCartCount(newCartCount);
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (cartItem: ProductInter) => {
    setCartItems(addCartItem(cartItems, cartItem));
  };

  const removeItemFromCart = (cartItem: ProductInter) => {
    setCartItems(removeCartItem(cartItems, cartItem));
  };

  const clearItemFromCart = (cartItem: ProductInter) => {
    setCartItems(clearCartItem(cartItems, cartItem));
  };

  const value: CartContextInter = {
    isOpened,
    setIsOpened,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    cartCount,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
