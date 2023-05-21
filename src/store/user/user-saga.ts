/* import { takeLatest, put, call, all } from "redux-saga/effects";

import {
  signInSuccess,
  signInFailure,
  signUpFailure,
  signUpSuccess,
  signOutSuccess,
  signOutFailure,
} from "./user-action";

import {
  getCurrentUser,
  AdditionalInformation,
  createUser,
  signInWithGooglePopup,
  signInUserWithInfo,
  createUserWithInfo,
  signOutUser,
} from "../../utils/Firebase/firebase";
import { User } from "firebase/auth";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { UserPayloadInter } from "../../utils/Actions/CreateUserAction";
import { UserActionType } from "./user-types";

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalInformation: AdditionalInformation
) {
  try {
    const userSnapshot: DocumentSnapshot<DocumentData> = yield call(
      createUser,
      userAuth,
      additionalInformation
    );
    const userId = userSnapshot.id;
    yield put(signInSuccess({ ...(userSnapshot.data() as User), id: userId }));
  } catch (error) {
    yield put(signInFailure(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth: User = yield call(getCurrentUser);
    if (!userAuth) return;

    const displayName: AdditionalInformation = {
      displayName: userAuth.displayName ? userAuth.displayName : undefined,
    };
    yield call(getSnapshotFromUserAuth, userAuth, displayName);
  } catch (error) {
    yield put(signInFailure(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user }: { user: User } = yield call(signInWithGooglePopup);
    const displayName: AdditionalInformation = {
      displayName: user.displayName ? user.displayName : undefined,
    };
    yield call(getSnapshotFromUserAuth, user, displayName);
  } catch (error) {
    yield put(signInFailure(error as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: {
  payload: UserPayloadInter;
}) {
  try {
    const { user } = yield call(signInUserWithInfo, email as string, password);
    const displayName: AdditionalInformation = {
      displayName: user.displayName ? user.displayName : undefined,
    };
    yield call(getSnapshotFromUserAuth, user, displayName);
  } catch (error) {
    yield put(signInFailure(error as Error));
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: {
  payload: UserPayloadInter;
}) {
  try {
    const { user } = yield call(createUserWithInfo, email as string, password);

    yield put(signUpSuccess(user));
  } catch (error) {
    yield put(signUpFailure(error as Error));
  }
}

export function* signInAfterSignUp(user: User) {
  yield call(getSnapshotFromUserAuth, user, {});
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error as Error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionType.EMAIL_SIGN_IN_START as any, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionType.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionType.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionType.SIGN_UP_START as any, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionType.SIGN_UP_SUCCESS as any, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionType.SIGN_OUT_START, signOut);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
 */
