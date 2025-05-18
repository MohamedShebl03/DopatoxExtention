import { signIn } from './auth.js';

document.querySelector('.signin-form').addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;

  const credentials = {
    email: form.email.value.trim(),
    password: form.password.value
  };
  console.log(credentials);
  

  // Simple check for required fields
  if (!credentials.email || !credentials.password) {
    alert("Please fill in both email and password.");
    return;
  }


  try {
    console.log("Signing in user:", credentials);
    const data = await signIn(credentials);
    console.log("Signin response data:", data);
    if (data && data.token) {
      alert("Signin successful!");
      // Store token in localStorage
      localStorage.setItem("accessToken", data.token);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      // Store userName in localStorage if available
      if (data.userName) {
        localStorage.setItem("userName", data.userName);
      }
      // Store state to show main page div
      localStorage.setItem("lastClickedLink", "mainPage");
      // Reload or navigate to update UI to main page
      location.href = 'popup.html';
    } else {
      alert("Signin failed: Invalid response from server.");
    }
  } catch (error) {
    console.error("Signin error:", error);
    alert("Signin request failed: " + error.message);
  }
});
