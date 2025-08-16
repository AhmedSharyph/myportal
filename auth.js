function logout(){
  localStorage.removeItem("userEmail");
  localStorage.removeItem("isAdmin");
  window.location.href = "index.html";
}

// Optional: auto-logout after 10 minutes
let logoutTimer = setTimeout(()=>logout(), 10*60*1000);
document.addEventListener("mousemove",()=>clearTimeout(logoutTimer));
document.addEventListener("keypress",()=>clearTimeout(logoutTimer));
