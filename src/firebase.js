// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPfbnrJLglhZY_6WNeU3KNnqnmmWgRyA8",
    authDomain: "instagram-react-clone-4fec4.firebaseapp.com",
    databaseURL:
        "https://instagram-react-clone-4fec4-default-rtdb.firebaseio.com",
    projectId: "instagram-react-clone-4fec4",
    storageBucket: "instagram-react-clone-4fec4.appspot.com",
    messagingSenderId: "893669253621",
    appId: "1:893669253621:web:32098c088e3e5abe7940bc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
