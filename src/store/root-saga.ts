import { all, call } from "redux-saga/effects";
import { categoiresSaga } from "./categories/categores-saga";
/* import { userSaga } from "./user/user-saga"; */

export function* rootSaga() {
  yield all([call(categoiresSaga) /* call(userSaga) */]);
}
