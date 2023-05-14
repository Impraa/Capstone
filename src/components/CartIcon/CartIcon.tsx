import "./CartIcon.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";

function CartIcon() {
  const { isOpened, setIsOpened } = useContext(CartContext);

  const { cartCount } = useContext(CartContext);

  return (
    <div onClick={() => setIsOpened(!isOpened)} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
}

export default CartIcon;
