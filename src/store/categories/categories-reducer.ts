import { CategoriesActionType } from "./categories-types";

export interface ProductInter {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}

export interface CategoryInter {
  title: string;
  items: ProductInter[];
}

export type CategoriesContextValue = {
  categories: CategoryInter[];
  isLoading: boolean;
  error: null | Error;
};

type CategoriesReducerAction = {
  type: CategoriesActionType;
  payload: CategoriesContextValue | null;
};

export const CATEGORIES_INITAL_STATE: CategoriesContextValue = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITAL_STATE,
  action: CategoriesReducerAction
) => {
  const { type, payload } = action;

  switch (type) {
    case CategoriesActionType.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CategoriesActionType.FETCH_CATEGORIES_FAILED:
      return { ...state, error: payload?.error, isLoading: false };
    case CategoriesActionType.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: payload?.categories, isLoading: false };
    default:
      return state;
  }
};
