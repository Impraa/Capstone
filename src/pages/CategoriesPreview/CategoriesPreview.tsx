import { Fragment } from "react";
import "./CategoriesPreview.scss";
import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";
import { useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoriesIsLoading,
} from "../../store/categories/categores-selector";
import Spinner from "../../components/Spinner/Spinner";

function CategoriesPreview() {
  const categories = useSelector(selectCategories);

  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : categories !== null ? (
        Object.keys(categories).map((title, i) => {
          const proudcts = categories[title];
          return <CategoryPreview key={i} title={title} items={proudcts} />;
        })
      ) : (
        <div>Loading...</div>
      )}
    </Fragment>
  );
}

export default CategoriesPreview;
