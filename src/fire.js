import { Alert } from "bootstrap";
import Firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMo8Ge7J0aTQtPzgjJ3wXAgB9Nz4ulCNs",
  authDomain: "memegenerator-2e759.firebaseapp.com",
  projectId: "memegenerator-2e759",
  storageBucket: "memegenerator-2e759.appspot.com",
  messagingSenderId: "420386030173",
  appId: "1:420386030173:web:727f9af238c411364583b4",
};

// Initialize Firebase
const firebase = Firebase.initializeApp(firebaseConfig);
const firestore = Firebase.firestore();

const UserData = async (user) => {
  console.log("Inside  UserData", user);
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  console.log(userRef);

  const snapshot = await userRef.get();
  // console.log("Snapshot::::" , snapshot.data());

  if (snapshot.data() !== undefined) {
    const f = await snapshot.data().memeImages;
    return f;
  }

};

const CreateUserDocument = async (user, additionalData) => {
  console.log("Inside create Use Document" + user);
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  const { email } = user;
  const data = additionalData;

  if (!snapshot.exists) {
    try {
      userRef.set({
        email,
        memeImages: [data],
      });
    } catch (error) {
      console.log(" Error in creating User " + error);
    }
  } else {
    const arr = snapshot.data().memeImages;
    console.log(snapshot.data());
    console.log(arr);
    let tempArr = [...arr];
    console.log("tempArrr :::" + tempArr);
    tempArr.push(data);
    try {
      userRef.set({
        email,
        memeImages: [...tempArr],
      });
    } catch (error) {
      console.log(" Error in creating User " + error);
    }
  }
};

export { firebase, CreateUserDocument, UserData };
