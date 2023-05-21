import { createCategoriesAction } from "../../utils/Actions/CreateCategoriesAction";
import { getCategoriesAndDocuments } from "../../utils/Firebase/firebase";
import { CategoryInter } from "./categories-reducer";
import { CategoriesActionType } from "./categories-types";

/* export const setCategories = (categories: CategoryInter[]) => {
  return createCategoriesAction(
    CategoriesActionType.SET_CATEGORIES_MAP,
    categories
  );
}; */

export const fetchCategoriesStart = () =>
  createCategoriesAction(CategoriesActionType.FETCH_CATEGORIES_START, {
    categories: [],
    isLoading: true,
    error: null,
  });

export const fetchCategoriesSuccess = (categories: CategoryInter[]) =>
  createCategoriesAction(CategoriesActionType.FETCH_CATEGORIES_SUCCESS, {
    categories: categories,
    isLoading: false,
    error: null,
  });

export const fetchCategoriesFaliure = (error: Error) =>
  createCategoriesAction(CategoriesActionType.FETCH_CATEGORIES_START, {
    categories: [],
    isLoading: false,
    error: error,
  });

export const fetchCategoriesAsync = () => async (dispatch: any) => {
  dispatch(fetchCategoriesStart());
  try {
    const categories = (await getCategoriesAndDocuments()) as CategoryInter[];

    dispatch(fetchCategoriesSuccess(categories));
  } catch (error) {
    dispatch(fetchCategoriesFaliure(error as Error));
  }
};
