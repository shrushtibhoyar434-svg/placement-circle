// ===== Placement Circle — shared JS =====

// --- Signup form ---
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please re-check.");
      return;
    }

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;

    // TODO: replace this with a real API call to your backend,
    // e.g. POST /api/signup  { fullname, email, password }
    // Your backend should create the account and store it in a database.

    alert("Account created successfully! Redirecting to login...");
    window.location.href = "login.html";
  });
}

// --- Login form ---
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // TODO: connect this to your backend for real authentication.
    if (email === "student@college.edu" && password === "Student@2026") {
      alert("Login successful! Redirecting to dashboard...");
      // window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password. Try the demo credentials shown below.");
    }
  });
}