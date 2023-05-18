import { DocumentData } from "firebase/firestore";
import { createCategoriesAction } from "../../utils/Actions/CreateCategoriesAction";
import { CategoryInter } from "./categories-reducer";
import { CategoriesActionType } from "./categories-types";

export const setCategories = (categories: CategoryInter[] | DocumentData[]) =>
  createCategoriesAction(CategoriesActionType.SET_CATEGORIES_MAP, categories);
