import { useParams } from "react-router-dom";
import "./Category.scss";
import { useEffect, useState } from "react";
import { ProductInter } from "../../contexts/CategoriesContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/categores-selector";

const Category = () => {
  const { category } = useParams();
  const categories = useSelector(selectCategories);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);

  return (
    <>
      <h2 className="category-title">{category?.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product: ProductInter) => {
            return <ProductCard key={product.id} {...product} />;
          })}
      </div>
    </>
  );
};

export default Category;
