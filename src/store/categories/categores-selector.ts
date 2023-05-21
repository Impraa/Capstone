import { createSelector } from "reselect";

import { RootState } from "../store";

const selectCategoryReducer = (state: RootState) => state.categories;

export const selectorCategories = createSelector(
  [selectCategoryReducer],
  (categories) => categories.categories
);

export const selectCategories = createSelector(
  [selectorCategories],
  (categories) => {
    return Array.isArray(categories)
      ? categories.reduce((acc: any, categroy) => {
          const { title, items } = categroy;
          acc[title.toLowerCase()] = items;
          return acc;
        }, {})
      : [];
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categories) => categories.isLoading
);
