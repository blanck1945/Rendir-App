import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg2xsToiY_G7ljG0H2dheTSghLwvB9EKA",
  authDomain: "type-todo.firebaseapp.com",
  databaseURL: "https://type-todo.firebaseio.com",
  projectId: "type-todo",
  storageBucket: "type-todo.appspot.com",
  messagingSenderId: "344457694267",
  appId: "1:344457694267:web:2877875735d5439916e01e",
  measurementId: "G-NDSWR0R22L",
};

export const db = firebase.initializeApp(firebaseConfig);
export const database = db.firestore();
