import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEFaT1wnK_s-YuqvK7rFe33-_s9fDJ07E",
  authDomain: "project-webbapp.firebaseapp.com",
  databaseURL: "https://project-webbapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "project-webbapp",
  storageBucket: "project-webbapp.firebasestorage.app",
  messagingSenderId: "1035467883052",
  appId: "1:1035467883052:web:2e6487ffe077781f244789",
  measurementId: "G-XHSNSFZM9H"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };