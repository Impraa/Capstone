import { createSelector } from "reselect";
import { RootState } from "../store";

const selectCartReducer = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector([selectCartReducer], (cart) => {
  return cart.isOpened;
});

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => {
    return Array.isArray(cartItems)
      ? cartItems.reduce(
          (total, cartItem) =>
            cartItem.quantity !== undefined ? total + cartItem.quantity : total,
          0
        )
      : 0;
  }
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  Array.isArray(cartItems)
    ? cartItems.reduce((total, cartItem) => total + cartItem.price, 0)
    : 0
);
