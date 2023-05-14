import "./ProductCard.scss";

import Button from "../Button/Button";
import { ProductInter } from "../../contexts/ProductContext";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

function ProductCard(props: ProductInter) {
  const { addItemToCart } = useContext(CartContext);

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
          addItemToCart(props);
        }}
        buttonType="inverted"
      >
        Add to cart
      </Button>
    </div>
  );
}

export default ProductCard;
