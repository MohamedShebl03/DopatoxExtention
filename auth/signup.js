import { signUp } from './auth.js';

document.querySelector('.signup-form').addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;

  const user = {
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    userName: form.userName.value.trim(),
    dateOfBirth: form.dateOfBirth.value,
    email: form.email.value.trim(),
    password: form.password.value
  };

  // Simple check for required dynamic fields
  if (!user.firstName || !user.lastName || !user.userName || !user.dateOfBirth || !user.email || !user.password) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    console.log("Signing up user:", user);
    const data = await signUp(user);
    console.log("Signup response data:", data);
    if (data && data.isSuccess) {
      alert("Signup successful! Please check your email for the verification code.");
      localStorage.setItem("lastClickedLink", "verifycode");
      location.href = 'popup.html';
      
    } else {
      const message = data.faildMessage || "Signup failed: Invalid response from server.";
      alert(message);
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("Signup request failed: " + error.message);
  }
});
