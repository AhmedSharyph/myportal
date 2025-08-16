// auth.js

/**
 * Returns the logged-in user email, or null if not logged in
 */
function getLoggedInUser() {
  return localStorage.getItem("userEmail") || localStorage.getItem("loggedInUser");
}

/**
 * Ensures user is logged in. Redirects to login page if not.
 * Returns the user email if logged in.
 */
function requireLogin() {
  const email = getLoggedInUser();
  if (!email) {
    window.location.replace("index.html");
    return null;
  }
  return email;
}

/**
 * Logout function: clears user info and redirects to login page
 */
function logout() {
  localStorage.removeItem("userEmail");
  localStorage.removeItem("loggedInUser");
  window.location.replace("index.html");
}

/**
 * Initializes header elements:
 * - Shows welcome message
 * - Reveals nav links
 * - Attaches logout handler
 */
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
