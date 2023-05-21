import { CartIconContainer, ItemCount, ShoppingIcon } from "./CartIcon.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectCartItems,
  selectIsCartOpen,
} from "../../store/cart/cart-selector";
import { setIsCartOpen } from "../../store/cart/cart-action";

function CartIcon() {
  const isOpened = useSelector(selectIsCartOpen);

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const cartCount = useSelector(selectCartCount);

  return (
    <CartIconContainer
      onClick={() => dispatch(setIsCartOpen(cartItems, !isOpened))}
    >
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
