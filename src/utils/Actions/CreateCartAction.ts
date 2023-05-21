import { CartInter } from "../../store/cart/cart-reducer";
import { CartActionType } from "../../store/cart/cart-types";

export const createCartAction = (type: CartActionType, payload: CartInter) => ({
  type,
  payload,
});
