import { ProductInter } from "../categories/categories-reducer";
import { CartActionType } from "./cart-types";

export interface CartInter {
  isOpened?: boolean;
  cartItems: ProductInter[];
}

type CartReducerAction = {
  type: CartActionType;
  payload: ReducerValues;
};

type ReducerValues = {
  isOpened: boolean;
  cartItems: ProductInter[];
};

const INITAL_VALUE: CartInter = {
  isOpened: false,
  cartItems: [],
};

export const cartReducer = (
  state = INITAL_VALUE,
  action: CartReducerAction
) => {
  const { type, payload } = action; //Beacuse payload stores value of user
  switch (type) {
    case CartActionType.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload.cartItems, //Everything after override keep previouse state
      };
    case CartActionType.IS_CART_OPENED:
      return {
        ...state,
        isOpened: payload.isOpened,
      };
    default:
      return state;
  }
};
