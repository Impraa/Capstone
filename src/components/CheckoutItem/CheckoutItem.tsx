import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { ProductInter } from "../../contexts/ProductContext";
import "./CheckoutItem.scss";

function CheckoutItem(props: ProductInter) {
  const { clearItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);
  const { name, imageUrl, price, quantity } = props;
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name"> {name}</span>
      <span className="quantity">
        <div
          className="arrow"
          onClick={() => {
            removeItemFromCart(props);
          }}
        >
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          className="arrow"
          onClick={() => {
            addItemToCart(props);
          }}
        >
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div
        className="remove-button"
        onClick={() => {
          clearItemFromCart(props);
        }}
      >
        &#10005;
      </div>
    </div>
  );
}

export default CheckoutItem;
