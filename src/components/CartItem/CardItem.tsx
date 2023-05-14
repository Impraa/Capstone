import { ProductInter } from "../../contexts/ProductContext";
import "./CardItem.scss";

function CardItem(props: ProductInter) {
  const { name, quantity, imageUrl, price } = props;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt="" />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="quantity">
          {quantity} X {price}
        </span>
      </div>
    </div>
  );
}

export default CardItem;
