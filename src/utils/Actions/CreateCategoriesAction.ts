import {
  CategoriesContextValue,
  CategoryInter,
} from "../../store/categories/categories-reducer";
import { CategoriesActionType } from "../../store/categories/categories-types";

export const createCategoriesAction = (
  type: CategoriesActionType,
  payload: CategoriesContextValue
) => ({ type, payload });
