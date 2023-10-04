// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence} from "firebase/auth";
import { collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCL0YZNdgzRFmg822sB02poTDDavbohSE",
  authDomain: "fitness-cf-28.firebaseapp.com",
  projectId: "fitness-cf-28",
  storageBucket: "fitness-cf-28.appspot.com",
  messagingSenderId: "2436766901",
  appId: "1:2436766901:web:06aaa4e1ed815a24f672fc"
};

// Initialize Firebase

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = initializeAuth(FirebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })
export const Firestore = getFirestore(FirebaseApp);



export const fetchUserData = async (uid) => {
  try {
    const userDocRef = doc(collection(Firestore, 'UserInfo'), uid);
    const userDocument = await getDoc(userDocRef);
    
    if (userDocument.exists()) {
      console.log("User data: ", userDocument.data());
      return userDocument.data();
    } else {
      console.log("No user data found!");
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
};

export const createUserData = async (uid, userData) => {
  try {
    // 'UserInfo' is the collection name
    const userDocRef = doc(collection(Firestore, 'UserInfo'), uid);
    
    await setDoc(userDocRef, userData);

    console.log("User data created/updated for: ", uid);
  } catch (error) {
    console.error("Error creating/updating user data: ", error);
  }
};

export const updateUserData = async (uid, newUserData) => {
  try {
    const userDocRef = doc(collection(Firestore, 'UserInfo'), uid);

    await updateDoc(userDocRef, newUserData);

    console.log("User data updated for: ", uid);
  } catch (error) {
    console.error("Error updating user data: ", error);
  }
};
