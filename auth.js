// auth.js

function getLoggedInUser() {
  return localStorage.getItem("userEmail") || localStorage.getItem("loggedInUser");
}

function requireLogin() {
  const email = getLoggedInUser();
  if (!email) {
    window.location.replace("index.html");
    return null;
  }
  return email;
}

function logout() {
  localStorage.removeItem("userEmail");
  localStorage.removeItem("loggedInUser");
  window.location.replace("index.html");
}

function initHeader() {
  document.addEventListener("DOMContentLoaded", () => {
    const email = requireLogin();
    if (!email) return;

    const welcomeEl = document.getElementById("welcome");
    if (welcomeEl) welcomeEl.innerText = `Welcome, ${email}`;

    const navLinks = document.getElementById("navLinks");
    if (navLinks) navLinks.classList.remove("hidden");

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", logout);
  });
}
