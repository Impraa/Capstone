import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Shop.scss";
function Shop() {
  const { product } = useContext(ProductContext);
  return (
    <div className="products-container">
      {product !== null ? (
        product.map((product) => <ProductCard key={product.id} {...product} />)
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default Shop;
