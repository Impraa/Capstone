import { RootState } from "../store";

export const selectCategories = (state: RootState) =>
  state.categories.categories.reduce((acc: any, categroy) => {
    const { title, items } = categroy;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
