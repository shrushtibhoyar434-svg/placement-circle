// signup.js
// Connects the signup form to the backend /api/auth/signup endpoint

const API_URL = "http://localhost:5000/api/auth/signup";

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  if (!signupForm) {
    console.error("Signup form not found. Make sure the form has id='signupForm'");
    return;
  }

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const branch = document.getElementById("branch").value.trim();
    const year = document.getElementById("year").value.trim();
    const errorBox = document.getElementById("errorMessage");

    // Clear previous error
    if (errorBox) errorBox.textContent = "";

    // Basic validation
    if (!name || !email || !password || !confirmPassword || !branch || !year) {
      showError(errorBox, "Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      showError(errorBox, "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      showError(errorBox, "Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      showError(errorBox, "Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, branch, year }),
      });

      const data = await response.json();

      if (!response.ok) {
        showError(errorBox, data.message || "Signup failed. Please try again.");
        return;
      }

      // Save token and user info for later use
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect after successful signup
      window.location.href = "onboarding.html";
    } catch (error) {
      console.error("Signup error:", error);
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
