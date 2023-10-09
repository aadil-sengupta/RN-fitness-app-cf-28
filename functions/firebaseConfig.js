// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence} from "firebase/auth";
import { collection, doc, getDoc,getDocs, getFirestore, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

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
const db = Firestore;

export async function fetchAllUsers() {
  try {
      const currentUserUID = FirebaseAuth.currentUser.uid;
      const usersSnapshot = await getDocs(collection(db, 'UserInfo'))
      const users = [];
      usersSnapshot.forEach(doc => {
        if (doc.id !== currentUserUID) {
          users.push({ uid: doc.id, ...doc.data() });
      }
      });
      return users;
  } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
  }
}

export async function sendFriendRequest(senderUID, receiverUID) {
  try {
      const receiverDocRef = doc(collection(db, 'UserInfo'), receiverUID);
      let newUserData = {
          friendRequests: arrayUnion(senderUID)
      }
      console.log(newUserData)
      await updateDoc(receiverDocRef, newUserData);
  } catch (error) {
      console.error("Error sending friend request:", error);
      throw error;
  }
}

export async function fetchFriendRequests() {
  const currentUserUID = FirebaseAuth.currentUser.uid;
  const userDocRef = doc(db, 'UserInfo', currentUserUID);
  const userDoc = await getDoc(userDocRef);
  const friendRequestUIDs = userDoc.data().friendRequests || [];

  const friendRequestsData = [];

  for (let uid of friendRequestUIDs) {
      const friendRequestDocRef = doc(db, 'UserInfo', uid);
      const friendRequestDoc = await getDoc(friendRequestDocRef);
      friendRequestsData.push({ uid: friendRequestDoc.id, ...friendRequestDoc.data() });
  }

  return friendRequestsData;
}

export async function acceptFriendRequest(senderUID, receiverUID) {
  const receiverDocRef = doc(db, 'UserInfo', receiverUID);
  const senderDocRef = doc(db, 'UserInfo', senderUID);

  await updateDoc(receiverDocRef, {
      friends: arrayUnion(senderUID),
      friendRequests: arrayRemove(senderUID)
  });

  await updateDoc(senderDocRef, {
      friends: arrayUnion(receiverUID)
  });
}

export async function declineFriendRequest(senderUID, receiverUID) {
  try {
      const receiverDocRef = db.collection('UserInfo').doc(receiverUID);
      await receiverDocRef.update({
          friendRequests: firebase.firestore.FieldValue.arrayRemove(senderUID)
      });
  } catch (error) {
      console.error("Error declining friend request:", error);
      throw error;
  }
}

export async function fetchUserFriendsData() {
  const currentUserUID = FirebaseAuth.currentUser.uid;

  const userDocRef = doc(db, 'UserInfo', currentUserUID);
  const userDocSnap = await getDoc(userDocRef);

  const friendsUIDs = userDocSnap.data().friends || [];

  const friendsData = [];

  for (let uid of friendsUIDs) {
      const friendDocRef = doc(db, 'UserInfo', uid);
      const friendDocSnap = await getDoc(friendDocRef);

      if (friendDocSnap.exists()) {
          friendsData.push({ uid: friendDocSnap.id, ...friendDocSnap.data() });
      }
  }

  return friendsData;
}

export const fetchUserData = async (uid) => {
  try {
    const userDocRef = doc(collection(Firestore, 'UserInfo'), uid);
    const userDocument = await getDoc(userDocRef);
    
    if (userDocument.exists()) {
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
