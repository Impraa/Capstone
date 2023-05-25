import { createSelector } from "reselect";

import { RootState } from "../store";
import { ProductInter } from "./categories-reducer";

const selectCategoryReducer = (state: RootState) => state.categories;

export const selectorCategories = createSelector(
  [selectCategoryReducer],
  (categories) => categories.categories
);

export interface ICategoryMap {
  [key: string]: ProductInter[];
}

export const selectCategories = createSelector(
  [selectorCategories],
  (categories) => {
    return Array.isArray(categories)
      ? categories.reduce((acc, categroy) => {
          const { title, items } = categroy;
          acc[title.toLowerCase()] = items;
          return acc;
        }, {} as ICategoryMap)
      : [];
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categories) => categories.isLoading
);
