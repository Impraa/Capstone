import { Link } from "react-router-dom";
import { CategoryInter } from "../../contexts/CategoriesContext";
import ProductCard from "../ProductCard/ProductCard";
import "./CategoryPreview.scss";

function CategoryPreview({ title, items }: CategoryInter) {
  const newItems = Array.isArray(items)
    ? items.filter((_, idx) => idx < 4)
    : [];
  return (
    <div className="category-preview-container">
      <h2>
        <span className="title">
          <Link to={title}> {title.toUpperCase()}</Link>
        </span>
      </h2>
      <div className="preview">
        {newItems.map((product) => {
          return <ProductCard key={product.id} {...product} />;
        })}
      </div>
    </div>
  );
}

export default CategoryPreview;
