// ---------- Element references ----------
const form = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const rememberBox = document.getElementById("remember");
const toggleBtn = document.getElementById("toggle-password");
const submitBtn = document.getElementById("submit-btn");
const statusEl = document.getElementById("form-status");
const forgotLink = document.getElementById("forgot-link");

const STORAGE_KEY = "rememberedUsername";

// ---------- Validation rules ----------
// Each validator returns an error message, or "" when the value is valid.
function validateUsername(value) {
  const v = value.trim();
  if (!v) return "Username is required.";
  if (v.length < 3) return "Username must be at least 3 characters.";
  if (!/^[A-Za-z0-9_.]+$/.test(v)) return "Use only letters, numbers, dots and underscores.";
  return "";
}

function validatePassword(value) {
  if (!value) return "Password is required.";
  if (value.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return "Password must include a letter and a number.";
  return "";
}

// ---------- UI helpers ----------
function showFieldState(input, message) {
  const errorEl = document.getElementById(`${input.id}-error`);
  errorEl.textContent = message;
  input.classList.toggle("invalid", Boolean(message));
  input.classList.toggle("valid", !message);
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

function setStatus(message, type = "") {
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
}

function checkUsername() {
  const message = validateUsername(usernameInput.value);
  showFieldState(usernameInput, message);
  return !message;
}

function checkPassword() {
  const message = validatePassword(passwordInput.value);
  showFieldState(passwordInput, message);
  return !message;
}

// ---------- Remember me ----------
function loadRememberedUser() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      usernameInput.value = saved;
      rememberBox.checked = true;
    }
  } catch (e) {
    // Storage can be blocked (private mode); the form still works without it.
  }
}

function saveRememberedUser() {
  try {
    if (rememberBox.checked) {
      localStorage.setItem(STORAGE_KEY, usernameInput.value.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {}
}

// ---------- Mock sign-in ----------
// Replace this with a real fetch() to your backend. Passwords are never stored.
function fakeSignIn(username, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(username.toLowerCase() === "demo" && password === "Password123");
    }, 800);
  });
}

// ---------- Event listeners ----------
usernameInput.addEventListener("blur", checkUsername);
passwordInput.addEventListener("blur", checkPassword);

// Once a field is marked invalid, re-check as the user types so the error clears quickly.
usernameInput.addEventListener("input", () => {
  if (usernameInput.classList.contains("invalid")) checkUsername();
});
passwordInput.addEventListener("input", () => {
  if (passwordInput.classList.contains("invalid")) checkPassword();
});

toggleBtn.addEventListener("click", () => {
  const showing = passwordInput.type === "text";
  passwordInput.type = showing ? "password" : "text";
  toggleBtn.textContent = showing ? "Show" : "Hide";
  toggleBtn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus("");

  const usernameOk = checkUsername();
  const passwordOk = checkPassword();
  if (!usernameOk || !passwordOk) {
    (usernameOk ? passwordInput : usernameInput).focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Signing in...";

  const success = await fakeSignIn(usernameInput.value.trim(), passwordInput.value);

  submitBtn.disabled = false;
  submitBtn.textContent = "Sign in";

  if (success) {
    saveRememberedUser();
    setStatus("Signed in successfully!", "ok");
  } else {
    setStatus("Incorrect username or password. (Demo: demo / Password123)", "fail");
  }
});

forgotLink.addEventListener("click", (event) => {
  event.preventDefault();
  setStatus("Password reset isn't wired up in this demo.", "");
});

document.querySelectorAll(".social-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    setStatus(`${btn.dataset.provider} login would start here (needs OAuth setup).`, "");
  });
});

loadRememberedUser();
