import { Route, Routes } from "react-router-dom";
import "./Shop.scss";
import CategoriesPreview from "../CategoriesPreview/CategoriesPreview";
import Category from "../Category/Category";
import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/Firebase/firebase";
import { setCategories } from "../../store/categories/categories-action";
import { useDispatch } from "react-redux";

function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categories = await getCategoriesAndDocuments();
      console.log(categories);
      dispatch(setCategories(categories));
    };

    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}

export default Shop;
