import { createCartAction } from "../../utils/Actions/CreateCartAction";
import { ProductInter } from "../categories/categories-reducer";
import { CartActionType } from "./cart-types";

export const setIsCartOpen = (cartItems: ProductInter[], bool: boolean) => {
  return createCartAction(CartActionType.IS_CART_OPENED, {
    cartItems: cartItems,
    isOpened: bool,
  });
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

export const addItemToCart = (
  cartItems: ProductInter[],
  cartItem: ProductInter
) => {
  const newCartItems = addCartItem(cartItems, cartItem) as ProductInter[];
  console.log(newCartItems);
  return createCartAction(CartActionType.SET_CART_ITEMS, {
    cartItems: newCartItems,
  });
};

export const removeItemFromCart = (
  cartItems: ProductInter[],
  cartItem: ProductInter
) => {
  const newCartItems = removeCartItem(cartItems, cartItem);
  return createCartAction(CartActionType.SET_CART_ITEMS, {
    cartItems: newCartItems,
  });
};

export const clearItemFromCart = (
  cartItems: ProductInter[],
  cartItem: ProductInter
) => {
  const newCartItems = clearCartItem(cartItems, cartItem);
  return createCartAction(CartActionType.SET_CART_ITEMS, {
    cartItems: newCartItems,
  });
};
