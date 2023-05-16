import { useContext } from "react";
import Button from "../Button/Button";
import { CartContext } from "../../contexts/CartContext";
import CardItem from "../CartItem/CardItem";
import { useNavigate } from "react-router-dom";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMsg,
} from "./CartDropdown.styles";
function CartDropdown() {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

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
        onClick={() => {
          navigate("/checkout");
        }}
      >
        Go to checkout
      </Button>
    </CartDropdownContainer>
  );
}

export default CartDropdown;
