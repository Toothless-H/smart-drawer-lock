import { db } from "./firebase-config.js";
import { ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  const button = document.getElementById("send-btn");
  const status = document.getElementById("status");
  const logTable = document.getElementById("log-table-body");

  const auth = getAuth();

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        window.location.href = "login.html";
      } catch (error) {
        console.error("Error during logout:", error);
      }
    });
  }

  if (button && status) {
    button.addEventListener("click", async () => {
      status.textContent = "Slot open";
      try {
        await set(ref(db, "command"), "A");

        const user = auth.currentUser;
        const logEntry = {
          user: user ? user.email : "onbekend",
          time: new Date().toISOString()
        };
        await push(ref(db, "logs"), logEntry);

        setTimeout(async () => {
          await set(ref(db, "command"), "B");
          status.textContent = "Slot gesloten";
        }, 3000);
      } catch (error) {
        console.error("Error sending command:", error);
        status.textContent = "Fout bij verzenden";
      }
    });
  }

  // Real-time log updates
  if (logTable) {
    const logsRef = ref(db, "logs");
    onValue(logsRef, (snapshot) => {
      logTable.innerHTML = "";
      const logs = snapshot.val();
      if (logs) {
        const entries = Object.values(logs).reverse();
        for (const entry of entries) {
          const row = document.createElement("tr");
          const userCell = document.createElement("td");
          const timeCell = document.createElement("td");

          userCell.textContent = entry.user;
          timeCell.textContent = new Date(entry.time).toLocaleString();

          row.appendChild(userCell);
          row.appendChild(timeCell);
          logTable.appendChild(row);
        }
      }
    });
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then((registration) => {
        console.log('Service worker registered');

        registration.onupdatefound = () => {
          const newWorker = registration.installing;
          newWorker.onstatechange = () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New version available. Reloading...');
              window.location.reload();
            }
          };
        };
      })
      .catch(error => console.error('SW registration failed:', error));
  }
});
