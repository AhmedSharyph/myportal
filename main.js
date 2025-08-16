const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzdSJ_2mNS8XODvPlGJFPICHYUIA8qc26PodQ1f7Z0oWbOF430LMLo_3vIeMIK66UGzuw/exec";

// Load header & footer dynamically
async function loadLayout() {
  if (document.getElementById("header-placeholder")) {
    const headerHTML = await (await fetch("header.html")).text();
    document.getElementById("header-placeholder").innerHTML = headerHTML;
  }
  if (document.getElementById("footer-placeholder")) {
    const footerHTML = await (await fetch("footer.html")).text();
    document.getElementById("footer-placeholder").innerHTML = footerHTML;
  }
}
loadLayout();

// Login
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch(WEB_APP_URL + "?action=login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (data.success) {
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid login");
    }
  });
}

// Register
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const res = await fetch(WEB_APP_URL + "?action=register", {
      method: "POST",
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();

    if (data.success) {
      alert("Registered successfully! Please login.");
      window.location.href = "index.html";
    } else {
      alert("Registration failed: " + data.message);
    }
  });
}

// Populate Dashboard/Profile
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    if (document.getElementById("userName")) {
      document.getElementById("userName").textContent = user.name;
    }
    if (document.getElementById("profileName")) {
      document.getElementById("profileName").textContent = user.name;
    }
    if (document.getElementById("profileEmail")) {
      document.getElementById("profileEmail").textContent = user.email;
    }
  } else {
    // Protect private pages
    if (!window.location.href.includes("index.html") && !window.location.href.includes("register.html")) {
      window.location.href = "index.html";
    }
  }
});
