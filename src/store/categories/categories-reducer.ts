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

type CategoriesContextValue = {
  categories: CategoryInter[];
};

type CategoriesReducerAction = {
  type: CategoriesActionType;
  payload: CategoriesContextValue | null;
};

export const CATEGORIES_INITAL_STATE: CategoriesContextValue = {
  categories: [],
};

export const categoriesReducer = (
  state = CATEGORIES_INITAL_STATE,
  action: CategoriesReducerAction
) => {
  const { type, payload } = action;

  switch (type) {
    case CategoriesActionType.SET_CATEGORIES_MAP:
      return { ...state, categories: payload };
    default:
      return state;
  }
};
