// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
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

export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: any
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object: any) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) =>
    docSnapshot.data()
  ); /* .reduce(
    (acc: any, docSnapshot: any) => {
      const data = docSnapshot.data();
      if (data.title) {
        acc[data.title.toLowerCase()] = data.items;
      }
      return acc;
    },
    {}
  );

  return categoryMap; */
};

export type AdditionalInformation = {
  displayName?: string;
};

export const createUser = async (
  userAuth: User,
  additionalInfo: AdditionalInformation
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userData = await getDoc(userDocRef);

  if (!userData.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Error creating the user", (error as Error).message);
    }
  } else {
    // If the user already exists in the database, update the displayName property
    const { email } = userAuth;
    const { displayName } = additionalInfo;
    try {
      await setDoc(
        userDocRef,
        {
          displayName,
          email,
        },
        { merge: true }
      );
    } catch (error) {
      console.log("Error updating the user", (error as Error).message);
    }
  }

  return userDocRef;
};

export const createUserWithInfo = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithInfo = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const userDocRef = doc(db, "users", userCredential.user.uid);
  const userDoc = await getDoc(userDocRef);
  const userData = userDoc.data();
  const user = { ...userCredential.user, displayName: userData?.displayName };
  return { user, credential: userCredential };
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
