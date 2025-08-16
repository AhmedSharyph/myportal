// auth.js

function getLoggedInUser() {
  return localStorage.getItem("userEmail") || localStorage.getItem("loggedInUser");
}

// Check login status and redirect if not logged in
function requireLogin() {
  const email = getLoggedInUser();
  if (!email) {
    window.location.replace("index.html");
    return null;
  }
  return email;
}

// Handle logout (clear storage + redirect)
function logout() {
  localStorage.removeItem("userEmail");
  localStorage.removeItem("loggedInUser");
  window.location.replace("index.html");
}

// Initialize header elements: welcome message + nav visibility
function initHeader() {
  document.addEventListener("DOMContentLoaded", () => {
    const email = requireLogin();
    if (!email) return;

    // Show welcome message
    const welcomeEl = document.getElementById("welcome");
    if (welcomeEl) welcomeEl.innerText = `Welcome, ${email}`;

    // Show nav links
    const navLinks = document.getElementById("navLinks");
    if (navLinks) navLinks.classList.remove("hidden");

    // Attach logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", logout);
  });
}
