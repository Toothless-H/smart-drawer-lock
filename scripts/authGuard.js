import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  const currentPage = window.location.pathname;

  if (!user && !currentPage.includes("login.html")) {
    // Not logged in → redirect to login
    window.location.href = "login.html";
  } else if (user && currentPage.includes("login.html")) {
    // Already logged in → redirect to main app
    window.location.href = "index.html";
  }
});