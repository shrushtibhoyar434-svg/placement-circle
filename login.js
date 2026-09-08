// login.js
// Connects the login form to the backend /api/auth/login endpoint

const API_URL = "http://localhost:5000/api/auth/login";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (!loginForm) {
    console.error("Login form not found. Make sure the form has id='loginForm'");
    return;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorBox = document.getElementById("errorMessage");

    // Clear previous error
    if (errorBox) errorBox.textContent = "";

    // Basic validation
    if (!email || !password) {
      showError(errorBox, "Please fill in both email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      showError(errorBox, "Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        showError(errorBox, data.message || "Login failed. Please try again.");
        return;
      }

      // Save token and user info for later use
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect after successful login
      window.location.href = "dashboard.html";
    } catch (error) {
      console.error("Login error:", error);
      showError(errorBox, "Something went wrong. Please check your connection.");
    }
  });
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(errorBox, message) {
  if (errorBox) {
    errorBox.textContent = message;
  } else {
    alert(message);
  }
}
