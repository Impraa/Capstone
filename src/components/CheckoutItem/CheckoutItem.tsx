import "./CheckoutItem.scss";
import { ProductInter } from "../../store/categories/categories-reducer";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart-action";
import { selectCartItems } from "../../store/cart/cart-selector";
import { FC, memo } from "react";

const CheckoutItem: FC<ProductInter> = memo((props: ProductInter) => {
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  /*   const { clearItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext); */
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
            dispatch(removeItemFromCart(cartItems, props));
          }}
        >
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          className="arrow"
          onClick={() => {
            dispatch(addItemToCart(cartItems, props));
          }}
        >
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div
        className="remove-button"
        onClick={() => {
          dispatch(clearItemFromCart(cartItems, props));
        }}
      >
        &#10005;
      </div>
    </div>
  );
});

export default CheckoutItem;
