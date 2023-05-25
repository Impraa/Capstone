import { useParams } from "react-router-dom";
import "./Category.scss";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoriesIsLoading,
} from "../../store/categories/categores-selector";
import { ProductInter } from "../../store/categories/categories-reducer";
import Spinner from "../../components/Spinner/Spinner";

/* type CategoryRouteParams = {
  category: string;
}; */

const Category = () => {
  const { category } =
    useParams /* <keyof CategoryRouteParams> */(); /* as CategoryRouteParams; */
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);

  return (
    <>
      <h2 className="category-title">{category?.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product: ProductInter) => {
              return <ProductCard key={product.id} {...product} />;
            })}
        </div>
      )}
    </>
  );
};

export default Category;
