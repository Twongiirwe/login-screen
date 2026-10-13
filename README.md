# Responsive Login Screen

A responsive login screen built with plain HTML, CSS and JavaScript (no dependencies).

## Video walkthrough

**Code explanation (5 min):** https://youtu.be/Bc8-YpgdkLc

## Features

- Username and password fields with a show/hide password toggle
- "Remember me" checkbox (saves the username in `localStorage`; the password is never stored)
- Client-side validation with inline error messages
  - Username: required, at least 3 characters, letters/numbers/`.`/`_` only
  - Password: required, at least 8 characters, must contain a letter and a number
  - Validates on blur and on submit; errors clear as the user corrects them
- "Forgot password?" link and Google / Facebook buttons (UI placeholders, no real OAuth)
- Responsive layout (works from small phones to desktop) and automatic dark mode
- Accessible: labels tied to inputs, `aria-describedby`, `role="alert"` errors, visible focus styles

## Run it

Open `index.html` in any browser. No build step needed.

Demo credentials for the mock sign-in: `demo` / `Password123`

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure and form markup |
| `styles.css` | Layout, theming, responsive rules |
| `script.js` | Validation, remember-me, password toggle, mock sign-in |
| `VIDEO_SCRIPT.md` | Talking points for the walkthrough video |
# login-screen