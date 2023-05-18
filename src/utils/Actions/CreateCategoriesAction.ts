import { CategoryInter } from "../../contexts/CategoriesContext";
import { CategoriesActionType } from "../../store/categories/categories-types";

export const createCategoriesAction = (
  type: CategoriesActionType,
  payload: CategoryInter[]
) => ({ type, payload });
