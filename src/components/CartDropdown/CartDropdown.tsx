import { useContext } from "react";
import Button from "../Button/Button";
import "./CartDropdown.scss";
import { CartContext } from "../../contexts/CartContext";
import CardItem from "../CartItem/CardItem";
import { useNavigate } from "react-router-dom";
function CartDropdown() {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems?.map((item) => (
          <CardItem key={item.id} {...item} />
        ))}
      </div>
      <Button
        properties={{ type: "button" }}
        buttonType="default"
        onClick={() => {
          navigate("/checkout");
        }}
      >
        Go to checkout
      </Button>
    </div>
  );
}

export default CartDropdown;
