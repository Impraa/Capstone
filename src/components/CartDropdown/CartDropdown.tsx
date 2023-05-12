import Button from "../Button/Button";
import "./CartDropdown.scss";
function CartDropdown() {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        <Button properties={{ type: "button" }} buttonType="default">
          Go to checkout
        </Button>
      </div>
    </div>
  );
}

export default CartDropdown;
