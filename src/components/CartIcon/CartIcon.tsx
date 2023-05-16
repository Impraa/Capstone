import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./CartIcon.styles";

function CartIcon() {
  const { isOpened, setIsOpened } = useContext(CartContext);

  const { cartCount } = useContext(CartContext);

  return (
    <CartIconContainer onClick={() => setIsOpened(!isOpened)}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
