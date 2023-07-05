// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZzDWmczk_aYhTN5Nty2Cxcq-o4ToK2jQ",
  authDomain: "task-project-84e1e.firebaseapp.com",
  projectId: "task-project-84e1e",
  storageBucket: "task-project-84e1e.appspot.com",
  messagingSenderId: "344639629082",
  appId: "1:344639629082:web:0a13bcde9b96ceda8d2ea3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app