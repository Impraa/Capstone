import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import "./CategoriesPreview.scss";
import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";

function CategoriesPreview() {
  const { categories } = useContext(CategoriesContext);
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
