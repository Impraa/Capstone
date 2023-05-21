import { CategoryInter } from "./categories-reducer";

import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/Firebase/firebase";

import {
  fetchCategoriesFaliure,
  fetchCategoriesSuccess,
} from "./categories-action";

import { CategoriesActionType } from "./categories-types";
/* 
export const fetchCategoriesAsync = () => async (dispatch: any) => {
    dispatch(fetchCategoriesStart());
    try {
      const categories = (await getCategoriesAndDocuments()) as CategoryInter[];
  
      dispatch(fetchCategoriesSuccess(categories));
    } catch (error) {
      dispatch(fetchCategoriesFaliure(error as Error));
    }
  }; */

export function* fetchCategoriesAsync() {
  try {
    const categories: CategoryInter[] = yield call(getCategoriesAndDocuments);

    yield put(fetchCategoriesSuccess(categories));
  } catch (error) {
    yield put(fetchCategoriesFaliure(error as Error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CategoriesActionType.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoiresSaga() {
  yield all([call(onFetchCategories)]);
}
