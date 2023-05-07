// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwhHeXQnodfpsdfTLcffxTdS5bV0ZoVIA",
  authDomain: "crown-clothing-7c832.firebaseapp.com",
  projectId: "crown-clothing-7c832",
  storageBucket: "crown-clothing-7c832.appspot.com",
  messagingSenderId: "301865094839",
  appId: "1:301865094839:web:ca69c75b95461868eb8732",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUser = async (
  userAuth: UserCredential,
  additionalInfo: { displayName?: string }
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.user.uid);

  const userData = await getDoc(userDocRef);

  if (!userData.exists()) {
    const { displayName, email } = userAuth.user;
    const createdAt = new Date();

    try {
      if (displayName === null) {
        await setDoc(userDocRef, {
          email,
          createdAt,
          ...additionalInfo,
        });
      } else {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
      }
    } catch (error) {
      console.log("Error creating the user", (error as Error).message);
    }
  }

  return userDocRef;
};

export const createUserWithInfo = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithInfo = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};
