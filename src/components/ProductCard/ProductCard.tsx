import "./ProductCard.scss";

import Button from "../Button/Button";

import { ProductInter } from "../../store/categories/categories-reducer";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart-selector";
import { addItemToCart } from "../../store/cart/cart-action";

function ProductCard(props: ProductInter) {
  /*   const { addItemToCart } = useContext(CartContext); */
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  return (
    <div className="product-card-container">
      <img src={props.imageUrl} alt={props.name} />
      <div className="footer">
        <span className="name">{props.name}</span>
        <span className="price">{props.price}</span>
      </div>
      <Button
        properties={{ type: "button" }}
        onClick={() => {
          dispatch(addItemToCart(cartItems, props));
        }}
        buttonType="inverted"
      >
        Add to cart
      </Button>
    </div>
  );
}

export default ProductCard;
