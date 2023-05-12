import "./ProductCard.scss";

import Button from "../Button/Button";
import { ProductInter } from "../../contexts/ProductContext";

function ProductCard(props: ProductInter) {
  return (
    <div className="product-card-container">
      <img src={props.imageUrl} alt={props.name} />
      <div className="footer">
        <span className="name">{props.name}</span>
        <span className="price">{props.price}</span>
      </div>
      <Button properties={{ type: "button" }} buttonType="inverted">
        Add to cart
      </Button>
    </div>
  );
}

export default ProductCard;
