import Button from "../Button/Button";
import CardItem from "../CartItem/CardItem";
import { useNavigate } from "react-router-dom";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMsg,
} from "./CartDropdown.styles";
import { selectCartItems } from "../../store/cart/cart-selector";
import { useSelector } from "react-redux";
import { useCallback } from "react";
function CartDropdown() {
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  const goToCheckoutHandler = useCallback(() => {
    navigate("/checkout");
  }, []);

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems?.length ? (
          cartItems?.map((item) => <CardItem key={item.id} {...item} />)
        ) : (
          <EmptyMsg>Your cart is empty</EmptyMsg>
        )}
      </CartItems>
      <Button
        properties={{ type: "button" }}
        buttonType="default"
        onClick={goToCheckoutHandler}
      >
        Go to checkout
      </Button>
    </CartDropdownContainer>
  );
}

export default CartDropdown;
