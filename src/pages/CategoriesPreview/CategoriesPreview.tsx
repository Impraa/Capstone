import { Fragment } from "react";
import "./CategoriesPreview.scss";
import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/categores-selector";

function CategoriesPreview() {
  const categories = useSelector(selectCategories);
  return (
    <Fragment>
      {categories !== null ? (
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
