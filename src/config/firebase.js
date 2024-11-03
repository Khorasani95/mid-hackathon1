// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiZLcD26eBA6Z4EkzhhChLxDZ5RBVvx0E",
  authDomain: "mid-hecathone.firebaseapp.com",
  projectId: "mid-hecathone",
  storageBucket: "mid-hecathone.appspot.com",
  messagingSenderId: "109696729376",
  appId: "1:109696729376:web:71fbd0ad4175c0615b1745",
  measurementId: "G-7W3N35C8D9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app)
const firestore = getFirestore(app)


export {auth,firestore}