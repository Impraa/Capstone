import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ProductInter } from "./CategoriesContext";

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
  addItemToCart: () => {},
  cartCount: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeItemFromCart: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearItemFromCart: () => {},
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

enum CartActionType {
  SET_CART_ITEMS = "SET_CART_ITEMS",
  IS_CART_OPENED = "IS_CART_OPENED",
}

type CartReducerAction = {
  type: CartActionType;
  payload: ReducerValues;
};

type ReducerValues = {
  isCartOpen?: boolean;
  cartItems?: ProductInter[];
  cartCount?: number;
  cartTotal?: number;
};

const INITAL_VALUE: CartContextInter = {
  isOpened: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsOpened: () => {},
  cartItems: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addItemToCart: () => {},
  cartCount: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeItemFromCart: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearItemFromCart: () => {},
  cartTotal: 0,
};

const cartReducer = (state: CartContextInter, action: CartReducerAction) => {
  const { type, payload } = action; //Beacuse payload stores value of user

  console.log(action);
  console.log("dispatched");
  switch (type) {
    case CartActionType.SET_CART_ITEMS:
      return {
        ...state,
        ...payload, //Everything after override keep previouse state
      };
    case CartActionType.IS_CART_OPENED:
      return {
        ...state,
        isOpened: payload.isCartOpen,
      };
    default:
      throw new Error(`Undhandled type ${type} in cartReducer`);
  }
};

export default function CartContextProvider({ children }: ChildrenInter) {
  const [{ cartItems, isOpened, cartCount, cartTotal }, dispatch] = useReducer(
    cartReducer,
    INITAL_VALUE as never
  );

  const updateCartItemsReducer = (newCartItems: ProductInter[]) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) =>
        cartItem.quantity !== undefined ? total + cartItem.quantity : 0,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.price,
      0
    );
    dispatch({
      type: CartActionType.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      },
    });
  };

  const addItemToCart = (cartItem: ProductInter) => {
    if (cartItems) {
      const newCartItems = addCartItem(cartItems, cartItem);
      updateCartItemsReducer(newCartItems);
    } else {
      throw new Error("No cart items");
    }
  };

  const removeItemFromCart = (cartItem: ProductInter) => {
    if (cartItems) {
      const newCartItems = removeCartItem(cartItems, cartItem);
      updateCartItemsReducer(newCartItems);
    } else {
      throw new Error("No cart items");
    }
  };

  const clearItemFromCart = (cartItem: ProductInter) => {
    if (cartItems) {
      const newCartItems = clearCartItem(cartItems, cartItem);
      updateCartItemsReducer(newCartItems);
    } else {
      throw new Error("No cart items");
    }
  };

  const setIsOpened = (isOpened: boolean) => {
    dispatch({
      type: CartActionType.IS_CART_OPENED,
      payload: { isCartOpen: isOpened },
    });
  };

  const value: CartContextInter = {
    isOpened,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
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
